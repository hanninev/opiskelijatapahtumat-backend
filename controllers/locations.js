const locationRouter = require('express').Router()
const Location = require('../models/location')

locationRouter.get('/', async (request, response) => {
    const locations = await Location
        .find({})
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
        if (body.name === undefined) {
            response.status(400).send({ error: 'name missing' })
        }

        const location = new Location({
            name: body.name,
            address: body.address
        })

        const savedLocation = await location.save()
        response.json(Location.format(savedLocation))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

locationRouter.delete('/:id', async (request, response) => {
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
    const body = request.body

    const location = {
        name: body.name,
        address: body.address
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

module.exports = locationRouter
