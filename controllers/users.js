const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const saltRounds = 9

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(User.format))
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const user = await User
            .findById(request.params.id)
        if (user) {
            response.json(User.format(user))
        } else {
            response.status(404).end()
        }
    } catch (err) {
        console.log(err)
        response.status(404).send({ error: 'malformatted id' })
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            firstName: body.firstName,
            surname: body.surname,
            email: body.email,
            passwordHash: passwordHash,
            organizers: body.organizers,
            admin: body.admin
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: 'something went wrong' })
    }
})

usersRouter.delete('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        await User.remove(user)
        response.status(204).end()
    } catch (err) {
        console.log(err)
        response.status(400).send({ error: 'malformatted id' })
    }
})

usersRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        const oldUser = await User.findById(request.params.id)

        if (!oldUser) {
            response.status(404).end()
        }

        if (body.password) {
            const passwordHash = await bcrypt.hash(body.password, saltRounds)
            const user = {
                username: body.username,
                firstName: body.firstName,
                surname: body.surname,
                email: body.email,
                passwordHash: passwordHash,
                organizers: body.organizers,
                admin: body.admin
            }
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
        response.json(User.format(updatedUser))
    } catch (err) {
        console.log(err)
        response.status(400).send({ error: 'malformatted id' })
        console.log('malformatted id')
    }
})

module.exports = usersRouter