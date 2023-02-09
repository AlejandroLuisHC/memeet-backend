const mongoose = require("mongoose")
const { User } = require("../models")
const fs = require("fs-extra")
const {
    uploadFile,
    deleteFile,
} = require("../utils/s3")

const usersController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User
                .find({})
                .sort({ createdAt: -1 })
                .populate({
                    path: "myMemes",
                    populate: [
                        { path: "tags" },
                        { path: "owner" }
                    ]
                })
                .populate("likedMemes")
                .lean()
                .exec()

            if (users.length === 0) {
                return res.status(404).send({
                    status: "false",
                    message: "No users found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: users
            })
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    getOneUser: async (req, res) => {
        const { id } = req.params

        try {
            const user = await User
                .findById(id)
                .populate({
                    path: "myMemes",
                    populate: [
                        { path: "tags" },
                        { path: "owner" }
                    ]
                })
                .populate("likedMemes")
                .lean()
                .exec()

            if (!user) {
                return res.status(404).send({
                    status: "false",
                    message: "User not found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: user
            })
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    postUser: async (req, res) => {
        const { body } = req

        try {
            const userExists = await User.findOne({ email: body.email }).lean().exec()
            if (userExists) {
                return res.status(409).send({
                    status: "false",
                    message: "User already exists"
                })
            } else {
                const user = await User.create({ ...body })
                res.status(201).send({
                    status: "Created",
                    data: user
                })
            }
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    patchUser: async (req, res) => {
        const { params: { id }, body, files } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                status: "false",
                message: "Invalid ID"
            })
        }

        try {
            if (files) {
                const { image } = files
                const userExists = await User.findById(id).lean().exec()

                if (!userExists) {
                    return res.status(409).send({
                        status: "false",
                        message: "User does not exists"
                    })
                } else {
                    // Delete old image from S3
                    if (userExists.image.key) {
                        await deleteFile(userExists.image.key)
                    }
                    // Upload new image to S3
                    const { Key, Location } = await uploadFile(image.tempFilePath, image.name)
                    await fs.unlink(image.tempFilePath)

                    // Update user
                    const user = await User.findByIdAndUpdate(id, {
                        ...body,
                        image: {
                            key: Key,
                            url: Location
                        }
                    }, { new: true })
                        .populate({
                            path: "myMemes",
                            populate: [
                                { path: "tags" },
                                { path: "owner" }
                            ]
                        })
                        .populate("likedMemes")
                        .lean()
                        .exec()

                    res.status(200).send({
                        status: "OK",
                        data: user
                    })
                }
            } else {
                const userExists = await User.findById(id).lean().exec()

                if (!userExists) {
                    return res.status(409).send({
                        status: "false",
                        message: "User does not exists"
                    })
                } else {
                    const user = await User.findByIdAndUpdate(id, {
                        ...body
                    }, { new: true })
                        .populate({
                            path: "myMemes",
                            populate: [
                                { path: "tags" },
                                { path: "owner" }
                            ]
                        })
                        .populate("likedMemes")
                        .lean()
                        .exec()

                    res.status(200).send({
                        status: "OK",
                        data: user
                    })
                }
            }
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                status: "false",
                message: "Invalid ID"
            })
        }

        try {
            const userExists = await User.findById(id).lean().exec()

            if (!userExists) {
                return res.status(409).send({
                    status: "false",
                    message: "User does not exists"
                })
            } else {
                // Delete image from S3
                if (userExists.image.key) {
                    await deleteFile(userExists.image.key)
                }
                // Delete user
                await User.findByIdAndDelete(id)
                res.status(200).send({
                    status: "OK",
                    message: "User deleted"
                })
            }
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    }
}

module.exports = {
    getAllUsers: usersController.getAllUsers,
    getOneUser: usersController.getOneUser,
    postUser: usersController.postUser,
    patchUser: usersController.patchUser,
    deleteUser: usersController.deleteUser
}