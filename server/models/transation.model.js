const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transationSchema = new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    book_owner: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },

    book_buyer: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }],


    //  book_buyer: [{
    //     type: String
    // }],

    status: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})



const Transation = mongoose.model('Transation', transationSchema)

module.exports = Transation