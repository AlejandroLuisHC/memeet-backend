const mongoose = require("mongoose")
const { Meme } = require("../models")
const fs = require("fs-extra")
const {
    uploadFile,
    deleteFile,
} = require("../utils/s3")

const memesController = {
    getAllMemes: async (req, res) => {
        try {
            const memes = await Meme
                .find({})
                .sort({ createdAt: -1 })
                .populate("tags")
                .populate("owner")
                .populate("likes")
                // .populate("comments")
                .lean()
                .exec()

            if (memes.length === 0) {
                return res.status(404).send({
                    status: "false",
                    message: "No memes found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: memes
            })
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    getOneMeme: async (req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                status: "false",
                message: "Invalid ID"
            })
        }

        try {
            const meme = await Meme
                .findById(id)
                .populate("tags")
                .populate("owner")
                .populate("likes")
                // .populate("comments")
                .lean()
                .exec()

            if (!meme) {
                return res.status(404).send({
                    status: "false",
                    message: "Meme not found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: meme
            })
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    postMeme: async (req, res) => {
        const { body, files } = req
        const tagsObjectIds = body?.tags.split(",").map(tag => mongoose.Types.ObjectId(tag))
        const newBody = {
            ...body,
            tags: tagsObjectIds
        }

        try {
            const { image } = files
            // Upload image to S3
            const imageName = image.name;
            const { Key, Location } = await uploadFile(image.tempFilePath, imageName)
            await fs.unlink(image.tempFilePath)

            // Create new meme
            const meme = await Meme.create({
                ...newBody,
                image: {
                    key: Key,
                    url: Location
                }
            })
            const updatedUser = await User.findByIdAndUpdate(
                { _id: body.owner },
                {
                    $push: {
                        memes: meme._id
                    }
                },
                { new: true }
            )

            res.status(201).send({
                status: "Created",
                data: {
                    meme,
                    updatedUser
                }
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    patchMeme: async (req, res) => {
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
                const memeExists = await Meme.findById(id).lean().exec()

                if (!memeExists) {
                    return res.status(409).send({
                        status: "false",
                        message: "Meme does not exists"
                    })
                } else {
                    // Delete old image from S3
                    if (memeExists.image.key) {
                        await deleteFile(memeExists.image.key)
                    }
                    // Upload new image to S3
                    const imageName = image.name;
                    const { Key, Location } = await uploadFile(image.tempFilePath, imageName)
                    await fs.unlink(image.tempFilePath)

                    // Update meme
                    const meme = await Meme.findByIdAndUpdate(id, {
                        ...body,
                        image: {
                            key: Key,
                            url: Location
                        }
                    }, { new: true })
                        .populate("tags")
                        .populate("owner")
                        .populate("likes")
                        // .populate("comments")
                        .lean()
                        .exec()

                    res.status(200).send({
                        status: "OK",
                        data: meme
                    })
                }
            } else {
                const memeExists = await Meme.findById(id).lean().exec()

                if (!memeExists) {
                    return res.status(409).send({
                        status: "false",
                        message: "Meme does not exists"
                    })
                } else {
                    const meme = await Meme.findByIdAndUpdate(id, {
                        ...body
                    }, { new: true })
                        .populate("tags")
                        .populate("owner")
                        .populate("likes")
                        // .populate("comments")
                        .lean()
                        .exec()

                    res.status(200).send({
                        status: "OK",
                        data: meme
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
    deleteMeme: async (req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                status: "false",
                message: "Invalid ID"
            })
        }

        try {
            const memeExists = await Meme.findById(id).lean().exec()

            if (!memeExists) {
                return res.status(409).send({
                    status: "false",
                    message: "Meme does not exists"
                })
            } else {
                // Delete image from S3
                if (memeExists.image.key) {
                    await deleteFile(memeExists.image.key)
                }
                // Delete user
                await Meme.findByIdAndDelete(id)
                res.status(200).send({
                    status: "OK",
                    message: "Meme deleted"
                })
            }
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    },
    searchMemes: async (req, res) => {
        const { query } = req

        try {
            const memes = await Meme
                .find({ $text: { $search: query } })
                .populate("tags")
                .populate("owner")
                .populate("likes")
                // .populate("comments")
                .lean()
                .exec()

            if (!memes) {
                return res.status(404).send({
                    status: "false",
                    message: "Memes not found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: memes
            })
        } catch (error) {
            res.status(500).send({
                status: "false",
                message: error.message
            })
        }
    }
}

module.exports = {
    getAllMemes: memesController.getAllMemes,
    getOneMeme: memesController.getOneMeme,
    postMeme: memesController.postMeme,
    patchMeme: memesController.patchMeme,
    deleteMeme: memesController.deleteMeme,
    searchMemes: memesController.searchMemes
}