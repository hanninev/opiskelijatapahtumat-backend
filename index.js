const axios = require('axios')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const eventTypesRouter = require('./controllers/eventTypes')
const organizersRouter = require('./controllers/organizers')
const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const locationsRouter = require('./controllers/locations')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/organizers', organizersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/event_types', eventTypesRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/login', loginRouter)


mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)

const server = http.createServer(app)

const PORT = config.port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
