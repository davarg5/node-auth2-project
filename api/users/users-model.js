const db = require('./../../database/dbConfig');

module.exports = {
    getAll,
    getById,
    getByUser,
    add
}

function getAll() {
    return db('users');
}

function getById(id) {
    return db('users').where('id', id).first();
}

function getByUser(user) {
    return db('users').where(user);
}

async function add(user) {
    const newId = await db('users').insert(user);
    return db('users').where('id', newId).first();
}