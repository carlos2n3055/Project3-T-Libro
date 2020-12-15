const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Book = require('../models/book.model')


// ----- ENDPOINTS BOOKS -----


// Muestra la lista de los libros (GET)
router.get('/getAllBooks', (req, res) => {

    Book
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD un nuevo libro (POST)
router.post('/newBook', (req, res) => {

    Book
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra los detalles de un libro (GET)
router.get('/getOneBook/:book_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.book_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Book
        .findById(req.params.book_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD un libro (PUT)
router.put('/editBook/:book_id', (req, res) => {

    const id = req.params.book_id

    if (!mongoose.Types.ObjectId.isValid(req.params.book_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Book
        .findByIdAndUpdate(id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})      

// Borra de la BBDD un libro (DELETE)
router.delete('/deleteBook/:book_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.book_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Book
        .findByIdAndDelete(req.params.book_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router