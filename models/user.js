const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    firstName: String,
    surName: String,
    email: { type: String },
    passwordHash: { type: String },
    organizers: { type: mongoose.Schema.Types.ObjectId, ref: 'organizers' },
    admin: { type: Boolean }
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        passwordHash: user.passwordHash,
        organizers: user.organizers,
        admin: user.admin
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User