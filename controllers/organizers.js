const organizerRouter = require('express').Router()
const Organizer = require('../models/organizer')

organizerRouter.get('/', async (request, response) => {
    const organizers = await Organizer
        .find({})
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
            web_site: body.web_site
        })

        const savedOrganizer = await organizer.save()
        response.json(Organizer.format(savedOrganizer))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

organizerRouter.delete('/:id', async (request, response) => {
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
    const body = request.body

    const organizerType = {
        name: body.name,
        fbpage_id: body.fbpage_id,
        organizer_type: body.organizer_type,
        faculty: body.faculty,
        web_site: body.web_site
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
