const { Schema, model } = require("mongoose")

const tagSchema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
        unique: true
   }
})

module.exports = model("Tag", tagSchema)