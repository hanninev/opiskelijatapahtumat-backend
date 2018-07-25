const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema({
    name: String
})

eventTypeSchema.statics.format = (eventType) => {
    return {
        id: eventType.id,
        name: eventType.name
    }
}

const EventType = mongoose.model('eventType', eventTypeSchema)

module.exports = EventType