const eventTypeRouter = require('express').Router()
const EventType = require('../models/eventType')

eventTypeRouter.get('/', async (request, response) => {
    const eventTypes = await EventType
        .find({})
    response.json(EventType.format(eventTypes))
})

eventTypeRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        if (body.name === undefined) {
            response.status(400).send({ error: 'name missing' })
        }

        const eventType = new EventType({
            name: body.name,
        })

        const savedEventType = await eventType.save()
        response.json(EventType.format(savedEventType))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventTypeRouter.delete('/:id', async (request, response) => {
    try {
        const eventType = await EventType.findById(request.params.id)
        await EventType.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

eventTypeRouter.put('/:id', async (request, response) => {
    const body = request.body

    const eventType = {
        name: body.name
    }

    EventType
        .findByIdAndUpdate(request.params.id, eventType, { new: true })
        .then(updatedEventType => {
            response.json(EventType.format(updatedEventType))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = eventTypeRouter
