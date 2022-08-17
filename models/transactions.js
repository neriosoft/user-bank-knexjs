let users = require('./users.json')

const { writeDataToFile } = require('../utils')

// @desc    Fund a User Account
// @route   PUT /api/fund
async function fundUser(req, res, id) {
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

module.exports = {
    fundUser
}