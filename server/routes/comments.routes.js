const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Comments = require('../models/comments.model')


// ----- ENDPOINTS COMMENTS -----


// Muestra todos los comentarios (GET)
router.get('/getAllComments', (req, res) => {

    Comments
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra un comentario (GET)
router.get('/getOneComment/:comment_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.comment_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Comments
        .findById(req.params.comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD un nuevo comentario (POST)
router.post('/newComment', (req, res) => {
    console.log(req.body)
    
    Comments
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Borra de la BBDD un comentario (DELETE)
router.delete('/deleteComment/:comment_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.comment_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Comments
        .findByIdAndDelete(req.params.comment_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router