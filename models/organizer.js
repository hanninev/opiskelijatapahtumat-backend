const mongoose = require('mongoose')

const organizerSchema = new mongoose.Schema({
    name: String,
    fbpage_id: String,
    gategory: String,
    type: String
})

organizerSchema.statics.format = (organizer) => {
    return {
        name: organizer.name,
        fbpage_id: organizer.fbpage_id,
        gategory: organizer.gategory,
        type: organizer.type
    }
}

const Organizer = mongoose.model('Organizer', organizerSchema)

module.exports = Organizer