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
const config = require('./utils/config')
const EventType = require('./models/eventType')
const Organizer = require('./models/organizer')
const Event = require('./models/event')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use('/admin', eventTypesRouter)
app.use('/organizers', organizersRouter)
app.use('/events', eventsRouter)

mongoose
    .connect(config.mongoUrl)
    .then(() => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })

    mongoose.Promise = global.Promise

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET

// Alunperin tämä haki tapahtumat Facebookista, kunnes kyseiset kyselyt estettiin

/* beforeAll = async () => {
  const auth = await axios.get("https://graph.facebook.com/oauth/access_token?client_id=" + appId + "&client_secret=" + appSecret + "&grant_type=client_credentials")
  const token = auth.data.access_token

  const allPages = await organizers.map(async p => {
    try {
   const requestCurrentPage = await axios.get('https://graph.facebook.com/v2.12/' + p.fbpage_id + '?fields=events.limit(30){start_time,name,owner,place,description}&access_token=' + token)
 if (requestCurrentPage.data.events !== undefined) {
      const currentPage = await requestCurrentPage.data.events.data.map(i => {
        return { ...i, organizer: p }
      })
      return currentPage
    } else {
      return []
    } 
  } catch (e) {
    console.log(e)
  }
  })
  const unMerged = await Promise.all(allPages)
  const merged = [].concat.apply([], unMerged)
  lista = merged
  console.log('data updated') 
  console.log(lista)
}


beforeAll() */

app.get('/load', async (req, res) => {
  beforeAll()
})

containsSomeSearchAttribute = (string, searchAttributes) => {
  return searchAttributes.some(s => string.indexOf(s) > 0)
}

app.get('/organizer_types', async (req, res) => {
  const organizers = await Organizer
  .find({})

  const organizerTypes = organizers.map(o => {
    if (o.type !== undefined) {
      return o.type
    }
  })

  const withoutDuplicates = Array.from(new Set(organizerTypes))
  res.json(withoutDuplicates)
})

app.get('/event_types', async (req, res) => {
  const eventTypes = await EventType
  .find({})

  const sorted = eventTypes.sort((a, b) => {
    if (a.text < b.text) {
      return -1
    } else {
      return 1
    }
  })
  res.json(sorted)
})

app.get('/locations', async (req, res) => {
  const locations = lista.map(e => {
    if (e.place !== undefined) {
      return e.place.name
    }
  })
  /*const withoutUndefined = locations.filter(p => p !== undefined)
    const sorted = withoutUndefined.slice().sort()
  
    const results = []
    for (let i = 0; i < sorted.length - 4; i++) {
      if (sorted[i + 4] == sorted[i]) {
        results.push(sorted[i]);
      }
    } */
  const results = locations
  const withoutDuplicates = Array.from(new Set(results))
  res.json(withoutDuplicates)
})

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
