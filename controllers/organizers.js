const organizerRouter = require('express').Router()
const Organizer = require('../models/organizer')
const jwt = require('jsonwebtoken')

const auth = (request) => {
    const token = request.get('authorization')
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    return token
}

organizerRouter.get('/', async (request, response) => {
    const organizers = await Organizer
        .find({ accepted: true })
    response.json(organizers.map(Organizer.format))
})

organizerRouter.get('/unaccepted', async (request, response) => {
    const organizers = await Organizer
        .find({ accepted: false })
    response.json(organizers.map(Organizer.format))
})

organizerRouter.get('/:id', async (request, response) => {
    const organizers = await Organizer
        .findById(request.params.id)
    response.json(organizers.map(Organizer.format))
})

organizerRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }
        if (body.organizer_type === undefined || body.organizer_type === '') {
            response.status(400).send({ error: 'organizer type missing' })
        }

        const organizer = new Organizer({
            name: body.name,
            fbpage_id: body.fbpage_id,
            organizer_type: body.organizer_type,
            faculty: body.faculty,
            web_site: body.web_site,
            accepted: false
        })

        const savedOrganizer = await organizer.save()
        response.json(Organizer.format(savedOrganizer))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

organizerRouter.post('/logged', async (request, response) => {
    auth(request)

    const body = request.body

    try {
        if (body.name === undefined || body.name === '') {
            response.status(400).send({ error: 'name missing' })
        }
        if (body.organizer_type === undefined || body.organizer_type === '') {
            response.status(400).send({ error: 'organizer type missing' })
        }

        const organizer = new Organizer({
            name: body.name,
            fbpage_id: body.fbpage_id,
            organizer_type: body.organizer_type,
            faculty: body.faculty,
            web_site: body.web_site,
            accepted: true
        })

        const savedOrganizer = await organizer.save()
        response.json(Organizer.format(savedOrganizer))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

organizerRouter.delete('/:id', async (request, response) => {
    auth(request)

    try {
        const organizer = await Organizer.findById(request.params.id)
        await Organizer.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

organizerRouter.put('/:id', async (request, response) => {
    auth(request)

    const body = request.body

    const organizerType = {
        name: body.name,
        fbpage_id: body.fbpage_id,
        organizer_type: body.organizer_type,
        faculty: body.faculty,
        web_site: body.web_site,
        accepted: body.accepted
    }

    organizerType
        .findByIdAndUpdate(request.params.id, organizer, { new: true })
        .then(updatedOrganizer => {
            response.json(Organizer.format(updatedOrganizer))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = organizerRouter
