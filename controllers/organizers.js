const organizerRouter = require('express').Router()
const Organizer = require('../models/organizer')

organizerRouter.get('/', async (request, response) => {
    const organizers = await Organizer
        .find({})

    organizers.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        } else {
            return 1
        }
    })
    response.json(organizers)
})

module.exports = organizerRouter
