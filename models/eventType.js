const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema({
    name: String,
    accepted: { type: Boolean }
})

eventTypeSchema.statics.format = (eventType) => {
    return {
        id: eventType.id,
        name: eventType.name,
        accepted: eventType.accepted
    }
}

const EventType = mongoose.model('eventType', eventTypeSchema)

module.exports = EventType