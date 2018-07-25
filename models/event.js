const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    start_time: { type: Date },
    end_time: { type: Date },
    eventTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'eventType' }],
    organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'organizer' }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
    locationInfo: String,
    description: String,
    fb_link: String,
    creationTime: { type: Date },
    lastModified: { type: Date },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

eventSchema.statics.format = (event) => {
    return {
        id: event._id,
        name: event.name,
        start_time: event.start_time,
        end_time: event.end_time,
        eventTypes: event.eventTypes,
        organizers: event.organizers,
        location: event.location,
        locationInfo: event.locationInfo,
        description: event.description,
        fb_link: event.fb_link,
        creationTime: event.creationTime,
        lastModified: event.lastModified,
        createdUser: event.createdUser
    }
}

const Event = mongoose.model('event', eventSchema)

module.exports = Event