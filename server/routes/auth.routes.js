const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")



// ----- ENPOINTS AUTH -----


// Añade un usuario en la BBDD (POST)
router.post('/signup', (req, res) => {

    const { name, lastname, email, password } = req.body

    if (!name || !lastname || !email || !password) {
        res.status(400).json({ message: 'Fill in all fields' })
        return
    }

    if (password.length < 4) {
        res.status(400).json({ message: 'Insecure password, please insert minimum 4 characters' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (foundUser) {
                res.status(400).json({ message: 'User already exists' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ name, lastname, email, password: hashPass })
                .then((newUser) => res.status(200).json(newUser))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


// Iinicio de sesión (POST)
router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' })
            return
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)
})


// Cierra la sesión del usuario (POST)
router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' })
})


// Comprueba si hay una sesión iniciada (GET)
router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Unauthorized' }))



module.exports = router