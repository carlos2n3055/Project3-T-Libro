const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({

description: [
        {
            type: String,
            trim: true
        }
    ],

owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
},
 
book: {
    type: Schema.Types.ObjectId,
    ref: "Book"
},

}, {
    timestamps: true
})



const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Comments