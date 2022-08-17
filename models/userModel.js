let users = require('./users.json')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((p) => p.id === id)
        resolve(user)
    })
}

function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        users.push(newUser)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./users.json', users);
        }
        resolve(newUser)
    })
}

function update(id, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p) => p.id === id)
        users[index] = {id, ...user}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./users.json', users);
        }
        resolve(users[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./users.json', products);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}