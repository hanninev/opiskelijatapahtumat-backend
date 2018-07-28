const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: String,
    address: String,
    accepted: { type: Boolean }
})

locationSchema.statics.format = (location) => {
    return {
        id: location._id,
        name: location.name,
        address: location.address,
        accepted: location.accepted
    }
}

const Location = mongoose.model('location', locationSchema)

module.exports = Location