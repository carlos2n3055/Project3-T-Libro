const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/dc9ajab1i/image/upload/v1607451142/project3/bookDefault.png"
    },

    photos: {
        type: [String]
    },

    status: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        required: true
    },

    exchange: {
        type: Boolean,
        default: false
    },

    sale: {
        type: Boolean,
        default: false
    },

    price: {
        type: Number
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // comments: [
    //     {
    //     type: Schema.Types.ObjectId,
    //     ref: "Comments"
    //     }
    // ]

}, {
    timestamps: true
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book