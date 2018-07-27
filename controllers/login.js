const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    let passwordCorrect
    if (user === null) {
        passwordCorrect = false
    } else {
        passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
    }

    if (!(user && passwordCorrect)) {
        return response.status(401).send({ error: 'invalid username or password' })
    }

    const userForToken = {
        id: user._id,
        username: user.username,
        role: user.role
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({ username: user.username, token, role: user.role })
})

module.exports = loginRouter