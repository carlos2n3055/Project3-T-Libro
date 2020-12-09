const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },

    img: {
        type: String,
        default: 'https://res.cloudinary.com/dc9ajab1i/image/upload/v1607452188/project3/userDefault.png'
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book",
            sparse: true
        }
    ]

}, {
    timestamps: true
})



const User = mongoose.model('User', userSchema)

module.exports = User