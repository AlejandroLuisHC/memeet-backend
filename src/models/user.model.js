const { Schema, model } = require("mongoose")
const validator = require("validator")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    image: {
        key: String,
        url: {
            type: String,
            default: "https://gifybucket.s3.eu-west-1.amazonaws.com/defaultAvatar.webp"
        }
    },
    myMemes: [{
        type: Schema.Types.ObjectId,
        ref: "Meme"
    }],
    likedMemes: [{
        type: Schema.Types.ObjectId,
        ref: "Meme"
    }]
}, {
    timestamps: true
})

module.exports = model("User", userSchema)