const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./../../config/secret');

const Users = require('./../users/users-model');
const { isValid } = require('./../users/users-service');

router.post('/register', (req, res) => {
    const credentials = req.body;
    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(credentials.password, rounds);
        credentials.password = hash;
        
        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    } else {
        res.status(400).json({ message: 'please enter a username and password'});
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(isValid(req.body)) {
        Users.getByUser({ username: username })
            .then(([user]) => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    const token = makeToken(user)
                    res.status(200).json({ 
                        message: `Welcome to our API, ${user.username}!`,
                        token,
                    })
                } else {
                    res.status(401).json({ message: 'You shall not pass! Invalid credentials'})
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    } else {
        res.status(400).json({ message: 'please enter a username and password' })
    }
})

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };
    const options = {
        expiresIn: '120s'
    }
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;