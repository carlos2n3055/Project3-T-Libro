const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Book = require('../models/book.model')

const { check_book_Id, check_buyer_Id } = require('./../middlewares/custom.middlewares')


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


// Muestra la lista de los libros del buyer (GET)
router.get('/getBooksBuyer/:buyer_id', check_buyer_Id, (req, res) => {

    Book
        .find({ owner: { _id: req.params.buyer_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra la lista de los libros del usuario logueado (GET)
router.get('/getMyBooks/:owner_id', (req, res) => {

    Book
        .find({ owner: { _id: req.params.owner_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra los detalles de un libro (GET)
router.get('/getOneBook/:book_id', check_book_Id, (req, res) => {

    Book
        .findById(req.params.book_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD un libro (PUT)
router.put('/editBook/:book_id', check_book_Id, (req, res) => {

    const book_id = req.params.book_id
    const info = req.body
   
    Book
        .findByIdAndUpdate(book_id, info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Cambia en la BBDD el id del propietario del libro (PUT)
router.put('/editBookOwner/:book_id', check_book_Id, (req, res) => {

    const book_id = req.params.book_id
    const userId = req.body.owner

    Book
        .findByIdAndUpdate(book_id, { owner: { _id: userId } })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Borra de la BBDD un libro (DELETE)
router.delete('/deleteBook/:book_id', check_book_Id, (req, res) => {

    const book_id = req.params.book_id

    Book
        .findByIdAndDelete(book_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router