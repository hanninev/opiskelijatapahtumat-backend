const mongoose = require('mongoose')

const eventTypeSchema = new mongoose.Schema({
    text: String,
    searchAttributes: [],
    dontShowIfTitleContains: [],
    dontShowEvents: []
})

eventTypeSchema.statics.format = (eventType) => {
    return {
        id: eventType.id,
        text: eventType.text,
        searchAttributes: eventType.searchAttributes,
        dontShowIfTitleContains: eventType.dontShowIfTitleContains,
        dontShowEvents: eventType.dontShowEvents
    }
}

const EventType = mongoose.model('EventType', eventTypeSchema)

module.exports = EventType