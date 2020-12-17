const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Book = require('../models/book.model')

const { check_book_id, check_buyer_id, check_owner_id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS BOOKS -----


// Muestra la lista de los libros para intercambio o venta (GET)
router.get('/getAllBooks', (req, res) => {

    Book
        .find({ $or: [{ exchange: true }, { sale: true }] })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD un nuevo libro (POST)
router.post('/newBook', (req, res) => {

    const book_info = req.body

    Book
        .create(book_info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra la lista de los libros del buyer (GET)
router.get('/getBooksBuyer/:buyer_id', check_buyer_id, (req, res) => {

    const buyer_id = req.params.buyer_id

    Book
        .find({ owner: { _id: buyer_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra la lista de los libros del usuario logueado(owner) (GET)
router.get('/getMyBooks/:owner_id', check_owner_id, (req, res) => {

    const owner_id = req.params.owner_id

    Book
        .find({ owner: { _id: owner_id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra los detalles de un libro (GET)
router.get('/getOneBook/:book_id', check_book_id, (req, res) => {

    const book_id = req.params.book_id

    Book
        .findById(book_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD un libro (PUT)
router.put('/editBook/:book_id', check_book_id, (req, res) => {

    const book_id = req.params.book_id
    const book_info = req.body
   
    Book
        .findByIdAndUpdate(book_id, book_info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Cambia en la BBDD el id de la propiedad "owner" del libro y se cambian "exchange" y "sale" a "false" para sacarlos de la lista de libros disponibles. Se resetea "price=0" (PUT)
router.put('/editBookOwner/:book_id', check_book_id, (req, res) => {

    const book_id = req.params.book_id
    const new_owner_id = req.body.owner

    Book
        .findByIdAndUpdate(book_id, { owner: { _id: new_owner_id }, exchange: false, sale: false, price: 0 })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Borra de la BBDD un libro (DELETE)
router.delete('/deleteBook/:book_id', check_book_id, (req, res) => {

    const book_id = req.params.book_id

    Book
        .findByIdAndDelete(book_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router