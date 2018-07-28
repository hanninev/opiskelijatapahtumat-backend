const moment = require('moment');
const eventRouter = require('express').Router()
const Event = require('../models/event')
const jwt = require('jsonwebtoken')

eventRouter.get('/', async (request, response) => {
  const events = await Event
    .find({})
    .populate('eventTypes')
    .populate('organizers')
    .populate('locations')

  if (request.query.start === undefined) {
    response.json(events.map(Event.format))
  }

  const palautettava = events.filter(p => {
    const date = moment(p.start_time).subtract(1, 'days').format().substring(0, 10)
    return moment(date).isBetween(request.query.start, request.query.end, null, '[]')
  })

  response.json(palautettava.map(Event.format))
})

eventRouter.get('/:id', async (request, response) => {
  const events = await Event
    .findById(request.params.id)
    .populate('eventTypse')
    .populate('organizers')
    .populate('locations')

  response.json(events.map(Event.format))
})

eventRouter.post('/logged', async (request, response) => {
  const token = request.get('authorization')
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  console.log(body)
  
  try {

    if (body.name === undefined || body.name === '') {
      response.status(400).send({ error: 'name missing' })
    }
    if (body.description === undefined || body.description === '') {
      response.status(400).send({ error: 'description missing' })
    }
    if (body.start_time === undefined || body.start_time === '') {
      response.status(400).send({ error: 'start date missing' })
    }
    if (body.end_time === undefined || body.end_time === '') {
      response.status(400).send({ error: 'end date missing' })
    }
    if (body.eventTypes === undefined || body.eventTypes.length === 0) {
      response.status(400).send({ error: 'event type missing' })
    }
    if (body.locations === undefined || body.locations.length === 0) {
      response.status(400).send({ error: 'location missing' })
    }
    if (body.organizers === undefined || body.organizers.length === 0) {
      response.status(400).send({ error: 'organizer missing' })
    }

    const event = new Event({
      id: body._id,
      name: body.name,
      start_time: body.start_time,
      end_time: body.end_time,
      eventTypes: body.eventTypes,
      organizers: body.organizers,
      locations: body.locations,
      locationInfo: body.locationInfo,
      description: body.description,
      fb_link: body.fb_link,
      creationTime: Date.now(),
      lastModified: Date.now(),
      createdUser: body.createdUser,
      accepted: true
    })

    const savedEvent = await event.save()

    response.json(Event.format(savedEvent))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

eventRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  try {

    if (body.name === undefined || body.name === '') {
      response.status(400).send({ error: 'name missing' })
    }
    if (body.description === undefined || body.description === '') {
      response.status(400).send({ error: 'description missing' })
    }
    if (body.start_time === undefined || body.start_time === '') {
      response.status(400).send({ error: 'start date missing' })
    }
    if (body.end_time === undefined || body.end_time === '') {
      response.status(400).send({ error: 'end date missing' })
    }
    if (body.eventTypes === undefined || body.eventTypes.length === 0) {
      response.status(400).send({ error: 'event type missing' })
    }
    if (body.locations === undefined || body.locations.length === 0) {
      response.status(400).send({ error: 'location missing' })
    }
    if (body.organizers === undefined || body.organizers.length === 0) {
      response.status(400).send({ error: 'organizer missing' })
    }

    const event = new Event({
      id: body._id,
      name: body.name,
      start_time: body.start_time,
      end_time: body.end_time,
      eventTypes: body.eventTypes,
      organizers: body.organizers,
      locations: body.locations,
      locationInfo: body.locationInfo,
      description: body.description,
      fb_link: body.fb_link,
      creationTime: Date.now(),
      lastModified: Date.now(),
      createdUser: body.createdUser,
      accepted: false
    })

    const savedEvent = await event.save()

    response.json(Event.format(savedEvent))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

eventRouter.delete('/:id', async (request, response) => {
  try {
    const event = await Event.findById(request.params.id)
    await Event.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

eventRouter.put('/:id', async (request, response) => {
  const body = request.body

  const event = {
    id: body._id,
    name: body.name,
    start_time: body.start_time,
    end_time: body.end_time,
    eventTypes: body.eventTypes,
    organizers: body.organizers,
    locations: body.locations,
    locationInfo: body.locationInfo,
    description: body.description,
    fb_link: body.fb_link,
    creationTime: body.creationTime,
    lastModified: Date.now(),
    createdUser: body.createdUser
  }

  Event
    .findByIdAndUpdate(request.params.id, event, { new: true })
    .then(updatedEvent => {
      response.json(Event.format(updatedEvent))
    })

    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = eventRouter
