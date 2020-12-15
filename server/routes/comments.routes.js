const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Comments = require('../models/comments.model')

const { check_comment_Id, check_book_Id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS COMMENTS -----


// Muestra todos los comentarios (GET)
router.get('/getAllComments/:book_id', check_book_Id, (req, res) => {

    Comments
        .find({ book: { _id: req.params.book_id }})
        .populate('book')
        .populate('user')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra un comentario (GET)
router.get('/getOneComment/:comment_id', check_comment_Id, (req, res) => {

    Comments
        .findById(req.params.comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD un nuevo comentario (POST)
router.post('/newComment', (req, res) => {
    
    Comments
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Borra de la BBDD un comentario (DELETE)
router.delete('/deleteComment/:comment_id', check_comment_Id, (req, res) => {

    Comments
        .findByIdAndDelete(req.params.comment_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router