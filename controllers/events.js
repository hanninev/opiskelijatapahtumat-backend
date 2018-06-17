const eventRouter = require('express').Router()
const Event = require('../models/event')

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
  },
  {
    "id": "2005956139621381",
    "name": "Fuksisitsit",
    "description": "Nyt sitsataan!",
    "start_time": "2018-05-08T20:00:00-0400",
    "organizer": {
      "name": "Historicus ",
      "fbpage_id": "127541777311945",
      "gategory": "Humanistinen tiedekunta",
      "type": "Tiedekunta- ja ainejärjestöt"
    },
    "place": {
      "name": "Alina-sali"
    }
  },
  {
    "id": "2005956139621381",
    "name": "Hallituksen kokous",
    "description": "Sääntömääräinen kokous",
    "start_time": "2018-05-09T20:00:00-0400",
    "organizer": {
      "name": "Matrix ry ",
      "fbpage_id": "258975124205023",
      "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
      "type": "Tiedekunta- ja ainejärjestöt"
    },
    "place": {
      "name": "Alina-sali"
    }
  }
  ]

eventRouter.get('/', async (request, response) => {
    //const events = await Event
    //    .find({})
    // response.json(events.map(Event.format))

    if (request.query.date === undefined) {
        return response.json(lista)
      }
      const ehdot = request.query.date.split(",")
      console.log(ehdot)
      const palautettava = lista.filter(p => ehdot.some(e => e === p.start_time.substring(0, 10)))
      response.json(palautettava)
})

eventRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)
    try {
        if (body.text === undefined) {
            response.status(400).send({ error: 'text missing' })
        }

        const event = new Event({
            name: body.name,
            description: body.description,
            start_time: body.start_time,
            organizer: body.organizer,
            place: body.place
        })

        const savedEvent = await event.save()

        response.json(Event.format(savedEvent))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventRouter.delete('/:id', async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
        await Event.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

eventRouter.put('/:id', async (request, response) => {
    const body = request.body

    const event = {
        name: body.name,
        description: body.description,
        start_time: body.start_time,
        organizer: body.organizer,
        place: body.place
    }

    Event
        .findByIdAndUpdate(request.params.id, event, { new: true })
        .then(updatedEvent => {
            response.json(Event.format(updatedEvent))
        })

        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = eventRouter
