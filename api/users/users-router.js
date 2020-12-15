const express = require('express');

const router = express.Router();

const Users = require('./users-model');
const restricted = require('./../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router;