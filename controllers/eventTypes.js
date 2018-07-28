const eventTypeRouter = require('express').Router()
const EventType = require('../models/eventType')
const jwt = require('jsonwebtoken')

const auth = (request) => {
  const token = request.get('authorization')
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  return token
}

eventTypeRouter.get('/', async (request, response) => {
    const eventTypes = await EventType
        .find({ accepted: true })
        response.json(eventTypes.map(EventType.format))
})

eventTypeRouter.get('/unaccepted', async (request, response) => {
    const eventTypes = await EventType
        .find({ accepted: false })
        response.json(eventTypes.map(EventType.format))
})

eventTypeRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }

        const eventType = new EventType({
            name: body.name,
            accepted: false
        })

        const savedEventType = await eventType.save()
        response.json(EventType.format(savedEventType))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventTypeRouter.post('/logged', async (request, response) => {
    auth(request)

    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }

        const eventType = new EventType({
            name: body.name,
            accepted: true
        })

        const savedEventType = await eventType.save()
        response.json(EventType.format(savedEventType))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventTypeRouter.delete('/:id', async (request, response) => {
    auth(request)

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
    auth(request)

    const body = request.body

    const eventType = {
        name: body.name,
        accepted: body.accepted
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

eventTypeRouter.put('/accept/:id', async (request, response) => {
    auth(request)

    EventType
        .findByIdAndUpdate(request.params.id, { accepted: true }, { new: true })
        .then(updatedEventType => {
            response.json(EventType.format(updatedEventType))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})


module.exports = eventTypeRouter
