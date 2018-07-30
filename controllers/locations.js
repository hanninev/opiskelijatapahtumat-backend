const locationRouter = require('express').Router()
const Location = require('../models/location')
const jwt = require('jsonwebtoken')

const auth = (request) => {
    const token = request.get('authorization')
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    return token
}

locationRouter.get('/', async (request, response) => {
    const locations = await Location
        .find({ accepted: true })
    response.json(locations.map(Location.format))
})

locationRouter.get('/by_value/', async (request, response) => {
    const locations = await Location
        .find({
            name: request.query.name,
            address: request.query.address
        })
    response.json(locations.map(Location.format))
})

locationRouter.get('/unaccepted', async (request, response) => {
    const locations = await Location
        .find({ accepted: false })
    response.json(locations.map(Location.format))
})

locationRouter.get('/:id', async (request, response) => {
    const locations = await Location
        .findById(request.params.id)
    response.json(locations.map(Location.format))
})

locationRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }
        if (body.address === undefined || body.address === '') {
            response.status(400).send({ error: 'name missing' })
        }

        const location = new Location({
            name: body.name,
            address: body.address,
            accepted: false
        })

        const savedLocation = await location.save()
        response.json(Location.format(savedLocation))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

locationRouter.post('/logged', async (request, response) => {
    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }
        if (body.address === undefined || body.address === '') {
            response.status(400).send({ error: 'name missing' })
        }

        const location = new Location({
            name: body.name,
            address: body.address,
            accepted: true
        })

        const savedLocation = await location.save()
        response.json(Location.format(savedLocation))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

locationRouter.delete('/:id', async (request, response) => {
    auth(request)

    try {
        const location = await Location.findById(request.params.id)
        await Location.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

locationRouter.put('/:id', async (request, response) => {
    auth(request)

    const body = request.body

    const location = {
        name: body.name,
        address: body.address,
        accepted: body.accepted
    }

    Location
        .findByIdAndUpdate(request.params.id, location, { new: true })
        .then(updatedLocation => {
            response.json(Location.format(updatedLocation))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

locationRouter.put('/accept/:id', async (request, response) => {
    auth(request)

    Location
        .findByIdAndUpdate(request.params.id, { accepted: true }, { new: true })
        .then(updatedLocation => {
            response.json(Location.format(updatedLocation))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = locationRouter
