const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        key: String,
        url: {
            type: String,
            required: true,
        }
    },
    tags: [{
        type: String,
        trim: true
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true
})

const User = model("Meme", userSchema)