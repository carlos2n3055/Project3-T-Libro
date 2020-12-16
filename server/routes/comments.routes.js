const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Comments = require('../models/comments.model')

const { check_comment_id, check_book_id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS COMMENTS -----


// Muestra todos los comentarios de un libro (GET)
router.get('/getAllComments/:book_id', check_book_id, (req, res) => {

    const book_id = req.params.book_id

    Comments
        .find({ book: { _id: book_id }})
        .populate('book')
        .populate('user')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra un comentario (GET)
router.get('/getOneComment/:comment_id', check_comment_id, (req, res) => {

    const comment_id = req.params.comment_id

    Comments
        .findById(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD un nuevo comentario (POST)
router.post('/newComment', (req, res) => {

    const info = req.body
    
    Comments
        .create(info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Borra de la BBDD un comentario (DELETE)
router.delete('/deleteComment/:comment_id', check_comment_id, (req, res) => {

    const comment_id = req.params.comment_id
    const info = req.body

    Comments
        .findByIdAndDelete(comment_id, info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router