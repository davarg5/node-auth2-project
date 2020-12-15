const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());


const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

server.use(helmet());
server.use(cors());

server.use('/api/users/', usersRouter);
server.use('/api/auth/', authRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up and running' })
})

module.exports = server;