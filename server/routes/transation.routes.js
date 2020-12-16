const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Transation = require('../models/transation.model')

const { check_owner_id, check_trans_id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS TRANSATION -----


// Muestra todas las transacciones del usuario logueado(owner) (GET)
router.get('/getAllTransation/:owner_id', check_owner_id, (req, res) => {

    const owner_id = req.params.owner_id

    Transation
        .find({ owner: { _id: owner_id }, status: false })
        .populate('book_owner')
        .populate('book_buyer')
        .populate('owner')
        .populate('buyer')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Guarda en la BBDD una nueva transacción (POST)
router.post('/newTransation', (req, res) => {

    const info = req.body

    Transation
        .create(info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Actualiza en la BBDD la propiedad "buy" a "true" de una transacción para indicar que es una transacción de venta (PUT)
router.put('/changeTransationBuy/:trans_id', check_trans_id, (req, res) => {

    const trans_id = req.params.trans_id

    Transation
        .findByIdAndUpdate(trans_id, { buy: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Actualiza en la BBDD la propiedad "status" a "true" de una transacción para indicar que se cierra una transacción (PUT)
router.put('/closeTransation/:trans_id', check_trans_id, (req, res) => {

    const trans_id = req.params.trans_id

    Transation
        .findByIdAndUpdate(trans_id, { status: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD una transacción (PUT)
router.put('/editTransation/:trans_id', check_trans_id, (req, res) => {

    const trans_id = req.params.trans_id
    const info = req.body

    Transation
        .findByIdAndUpdate(trans_id, info)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router