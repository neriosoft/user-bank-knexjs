let users = require('./users.json')
const knex = require('./knex');
const { writeDataToFile } = require('../utils')

function findAll() {

    knex.from('users').select('*').then(users => console.log(JSON.stringify(users)));
    return new Promise((resolve, reject) => {
        
        resolve(users)
    })
}

function findById(id) {
    knex.from('users').select('*').where('user.id', '=',id).then(user => console.log(JSON.stringify(user)));
    return new Promise((resolve, reject) => {
        const user = users.find((p) => p.id === id)
        resolve(user)
    })
}

function create(user) {
    knex('user').insert({ name: user.name, email: user.email, password: user.password}).then(() => 
    console.log('user created successfully'))
    
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