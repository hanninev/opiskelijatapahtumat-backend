const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: String,
    address: String
})

locationSchema.statics.format = (location) => {
    return {
        id: location._id,
        name: location.name,
        address: location.address
    }
}

const Location = mongoose.model('location', locationSchema)

module.exports = Location