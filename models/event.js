const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    start_time: String,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'organizer' },
    place: String
})

eventSchema.statics.format = (event) => {
    return {
        name: event.name,
        description: event.description,
        start_time: event.start_time,
        organizer: event.organizer,
        place: event.place
    }
}

const Event = mongoose.model('Event', eventSchema)

module.exports = Event