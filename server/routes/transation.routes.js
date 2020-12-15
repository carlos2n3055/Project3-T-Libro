const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Transation = require('../models/transation.model')

const { check_owner_Id } = require('./../middlewares/custom.middlewares')


// ----- ENDPOINTS TRANSATION -----


// Muestra todas las transacciones (GET) OK--------------------
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


// // Muestra un comentario (GET)
// router.get('/getOneComment/:comment_id', (req, res) => {

//     if (!mongoose.Types.ObjectId.isValid(req.params.comment_id)) {
//         res.status(404).json({ message: 'Invalid ID' })
//         return
//     }

//     Comments
//         .findById(req.params.comment_id)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })


// Guarda en la BBDD una transaccion (POST) OK-------------------------OKOKOK
router.post('/newTransation', (req, res) => {
    console.log(req.body)
    Transation
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Cierra una transacción en la BBDD (PUT)
router.put('/closeTransation/:trans_id', (req, res) => {

    // const trans_id = req.params.transation_id

    const trans_id = req.params.trans_id

    // if (!mongoose.Types.ObjectId.isValid(req.params.trans_id)) {
    //     res.status(404).json({ message: 'Invalid ID' })
    //     return
    // }

    Transation
        .findByIdAndUpdate(trans_id, { status: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// Edita en la BBDD una transaccion (PUT)
router.put('/editTransation/:trans_id', (req, res) => {

    const id = req.params.trans_id

    if (!mongoose.Types.ObjectId.isValid(req.params.trans_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Transation
        .findByIdAndUpdate(id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router