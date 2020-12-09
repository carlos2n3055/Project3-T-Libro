const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Book = require('../models/book.model')


// ----- ENDPOINTS USER -----


// Muestra la lista de todos los usuarios (GET)
router.get('/getAllUsers', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra los datos de un usuario (GET)
router.get('/getOneUser/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User
        .findById(req.params.user_id)
        .populate('book')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Actualiza los datos de un usuario en la BBDD (PUT)
router.put('/editUser/:user_id', (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router