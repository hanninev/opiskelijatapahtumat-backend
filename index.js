const axios = require('axios')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const eventTypesRouter = require('./controllers/eventTypes')
const organizersRouter = require('./controllers/organizers')
const config = require('./utils/config')
const EventType = require('./models/eventType')
const Organizer = require('./models/organizer')

app.use(cors())
app.use(bodyParser.json())
app.use('/admin', eventTypesRouter)
app.use('/organizers', organizersRouter)


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
let lista = [{
  "id": "2005956139621381",
  "name": "Hämäläis-Osakunta goes suursitsit!",
  "description": "Hämis lähtee Senaatintorin Suursitseille! Kevät ja kevään suurimmat sitsit odottavat! Tarjolla on mitä mahtavimmat sitsit, hyvää seuraa ja maittavaa ruokaa. Juhlat alkavat torstaina 24.5.2018 siinä 16.30/17 aikaan Senaatintorilla. Aikataulut tarkentuvat vielä lähempänä tapahtumaa. Pukukoodina kesäinen asu, osakunta-/järjestönauha ja ylioppilaslakki. Pukeutumisen on kuitenkin hyvä olla säänmukaista. Hintaa suursitseille kertyy 22 euroa. Maksutiedot ilmoitetaan osallistujille myöhemmin aikataulun kera. Suursitsit Senaatintorilla järjestetään osakuntalaitoksen 375-juhlavuoden sekä Helsingin yliopiston ylioppilaskunnan 150-juhlavuoden kunniaksi 24.5.2018. Paikalle on tulossa jopa 1900 opiskelijaa ja yliopistoyhteisön jäsentä. Nimensä mukaisesti kyse on koko Senaatintorin kattavista suurista sitseistä, joiden ideana on tuoda ylioppilaiden juhlaperinnettä näkyväksi pois ylioppilastaloilta ja avata sitä myös kaupunkilaisille. Hintaan sisältyy maukkaan ruoan ja juoman lisäksi myös suursitsien haalarimerkki. Ilmoittautuminen avautuu keskiviikkona 28.3.2018 klo 12 osoitteessa http://hamis.nettilomake.fi/form/5915!",
  "start_time": "2018-05-24T20:00:00-0400",
  "organizer": {
    "name": "Hämäläis-Osakunta (HO)",
    "fbpage_id": 420221918176511,
    "gategory": "",
    "type": "Osakunnat"
  },
  "place": {
    "name": "Hämäläis-osakunta"
  }
},
{
  "id": "2005956139621381",
  "name": "Kevätsitsit",
  "description": "Wappu ei lopu!",
  "start_time": "2018-05-10T20:00:00-0400",
  "organizer": {
    "name": "Moodi ",
    "fbpage_id": 195948560421434,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  "place": {
    "name": "Alina-sali"
  }
},
{
  "id": "2005956139621381",
  "name": "Ompeluilta",
  "description": "Jee ompelemaan",
  "start_time": "2018-05-11T20:00:00-0400",
  "organizer": {
    "name": "Viikin taloustieteilijät",
    "fbpage_id": 172909282731720,
    "gategory": "Maatalous-metsätieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  "place": {
    "name": "C-grundi"
  }
},
{
  "id": "2005956139621381",
  "name": "Tekiksen kesäbileet",
  "description": "Wappu ei lopu!",
  "start_time": "2018-05-12T20:00:00-0400",
  "organizer": {
    "name": "TKO-äly ",
    "fbpage_id": 175686629125957,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  "place": {
    "name": "Klusteri"
  }
},
{
  "id": "2005956139621381",
  "name": "Beer pong -turnaus",
  "description": "Wappu ei lopu!",
  "start_time": "2018-05-10T20:00:00-0400",
  "organizer": {
    "name": "TKO-äly ",
    "fbpage_id": 175686629125957,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  "place": {
    "name": "Klusteri"
  }
},
{
  "id": "2005956139621381",
  "name": "Kesäsitsit",
  "description": "Tervetuloa sitsaamaan",
  "start_time": "2018-05-08T20:00:00-0400",
  "organizer": {
    "name": "Hämäläis-Osakunta (HO)",
    "fbpage_id": 420221918176511,
    "gategory": "",
    "type": "Osakunnat"
  },
  "place": {
    "name": "Hämäläis-osakunta"
  }
},
{
  "id": "2005956139621381",
  "name": "Limeksen appro",
  "description": "Wappu ei lopu!",
  "start_time": "2018-05-13T20:00:00-0400",
  "organizer": {
    "name": "Limeksen appro",
    "fbpage_id": 338222509565589,
    "gategory": "",
    "type": "Muut"
  },
  "place": {
    "name": "Apollo"
  }
}
]

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
*/

// beforeAll()

app.get('/load', async (req, res) => {
  beforeAll()
})

containsSomeSearchAttribute = (string, searchAttributes) => {
  return searchAttributes.some(s => string.indexOf(s) > 0)
}

app.get('/events', async (req, res) => {
  if (req.query.date === undefined) {
    return res.json(lista)
  }
  const ehdot = req.query.date.split(",")
  console.log(ehdot)
  const palautettava = lista.filter(p => ehdot.some(e => e === p.start_time.substring(0, 10)))
  res.json(palautettava)
})

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
  /*  const withoutUndefined = locations.filter(p => p !== undefined)
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
