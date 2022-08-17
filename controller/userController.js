const User = require('../models/userModel')

const { getUserData } = require('../utils')

// @desc    Gets All Users
// @route   GET /api/users
async function getUsers(req, res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single User
// @route   GET /api/user/:id
async function getUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a user
// @route   POST /api/users
async function createUser(req, res) {
    try {
        const body = await getUserData(req)

        const { name, email, password } = JSON.parse(body)

        const user = {
            name,
            email,
            password
        }

        const newUser = await User.create(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a User
// @route   PUT /api/users/:id
async function updateUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Account Not Found' }))
        } else {
            const body = await getUserData(req)

            const { name, email, password } = JSON.parse(body)

            const userData = {
                name: name || user.name,
                email: email || user.email,
                password: password || user.password
            }

            const updUser = await User.update(id, userData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updUser)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete User
// @route   DELETE /api/user/:id
async function deleteUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            await User.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `User ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    
}