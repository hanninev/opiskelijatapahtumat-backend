const mongoose = require('mongoose')

const organizerSchema = new mongoose.Schema({
    name: String,
    fbpage_id: String,
    organizer_type: String,
    faculty: String,
    web_site: String
})

organizerSchema.statics.format = (organizer) => {
    return {
        id: organizer._id,
        name: organizer.name,
        fbpage_id: organizer.fbpage_id,
        organizer_type: organizer.organizer_type,
        faculty: organizer.faculty,
        web_site: organizer.web_site
    }
}

const Organizer = mongoose.model('organizer', organizerSchema)

module.exports = Organizer