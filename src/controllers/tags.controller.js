const mongoose = require("mongoose")
const { Tag } = require("../models")

const tagsController = {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag
                .find({})
                .lean()
                .exec()

            if (tags.length === 0) {
                return res.status(404).send({
                    status: "false",
                    message: "No tags found"
                })
            }
            res.status(200).send({
                status: "OK",
                data: tags
            })

        } catch (error) {
            res.status(500).send({
                status: "false",
                message: "Internal server error"
            })
        }
    },
    postTag: async (req, res) => {
        const { body } = req

        try {
            const tagExists = await Tag.findOne({ name: body.name }).lean().exec()   
            if (tagExists) {
                res.status(409).send({
                    status: "false",
                    message: "Tag already exists"
                })
            } else {
                const tag = await Tag.create({ ...body })
                res.status(201).send({
                    status: "Created",
                    data: tag
                })
            }
        } catch (err) {
            res.status(500).send({
                status: "false",
                message: "Internal server error"
            })
        }
    }
}

module.exports = {
    getAllTags: tagsController.getAllTags,
    postTag: tagsController.postTag
}