const eventTypeRouter = require('express').Router()
const EventType = require('../models/eventType')

eventTypeRouter.get('/', async (request, response) => {
    const eventTypes = await EventType
    .find({})
    response.json(eventTypes.map(EventType.format))
})

eventTypeRouter.post('/', async (request, response) => {
    const body = request.body
console.log(body)
    try {
        if (body.text === undefined) {
            response.status(400).send({ error: 'text missing' })
        }

        const eventType = new EventType({
            text: body.text,
            searchAttributes: body.searchAttributes,
            dontShowIfTitleContains: body.dontShowIfTitleContains,
            dontShowEvents: body.dontShowEvents
        })

        const savedEventType = await eventType.save()

        response.json(EventType.format(savedEventType))
    } catch (exception) {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = eventTypeRouter
