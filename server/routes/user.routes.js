const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')

const { check_user_id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS USER -----


// Muestra la lista de todos los usuarios (GET)
router.get('/getAllUsers', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Muestra los datos de un usuario (GET)
router.get('/getOneUser/:user_id', check_user_id, (req, res) => {

    const user_id = req.params.user_id

    User
        .findById(user_id)
        .populate('book')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Actualiza los datos de un usuario en la BBDD (PUT)
router.put('/editUser/:user_id', check_user_id, (req, res) => {

    const user_id = req.params.user_id
    const user_info = req.body

    User
        .findByIdAndUpdate(user_id, user_info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router