const { Schema, model } = require("mongoose")

const memeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    image: {
        key: String,
        url: {
            type: String,
            required: true,
        }
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    // comments: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
}, {
    timestamps: true
})

module.exports = model("Meme", memeSchema)