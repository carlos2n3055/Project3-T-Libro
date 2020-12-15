const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Transation = require('../models/transation.model')

const { check_owner_Id, check_trans_Id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS TRANSATION -----


// Muestra todas las transacciones del usuario logueado (GET)
router.get('/getAllTransation/:owner_id', check_owner_Id, (req, res) => {

    Transation
        .find({ owner: { _id: req.params.owner_id, status: false } })
        .populate('book_owner')
        .populate('book_buyer')
        .populate('owner')
        .populate('buyer')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD una nueva transacción (POST)
router.post('/newTransation', (req, res) => {

    Transation
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Cierra una transacción en la BBDD (PUT)
router.put('/closeTransation/:trans_id', check_trans_Id, (req, res) => {

    const trans_id = req.params.trans_id

    Transation
        .findByIdAndUpdate(trans_id, { status: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD una transaccion (PUT)
router.put('/editTransation/:trans_id', check_trans_Id, (req, res) => {

    const trans_id = req.params.trans_id

    Transation
        .findByIdAndUpdate(trans_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router