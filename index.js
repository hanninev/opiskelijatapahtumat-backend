const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const appId = process.env.APP_ID
const appSecret = process.env.APP_SECRET
let lista = []

beforeAll = async () => {
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
}

beforeAll()

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

app.get('/organizers', async (req, res) => {
  organizers.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else {
      return 1
    }
  })
  res.json(organizers)
})

app.get('/organizer_types', async (req, res) => {
  const organizerTypes = organizers.map(o => {
    if (o.type !== undefined) {
      return o.type
    }
  })

  const withoutDuplicates = Array.from(new Set(organizerTypes))
  res.json(withoutDuplicates)
})

app.get('/event_types', async (req, res) => {
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

  const withoutUndefined = locations.filter(p => p !== undefined)
  const sorted = withoutUndefined.slice().sort()

  const results = []
  for (let i = 0; i < sorted.length - 4; i++) {
    if (sorted[i + 4] == sorted[i]) {
      results.push(sorted[i]);
    }
  }

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

let eventTypes = [
  {
    "text": "sitsit",
    "searchAttributes": ["sitsit", "sitseill"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": [599806090358583]
  },
  {
    "text": "approt",
    "searchAttributes": ["approt", "appro"],
    "dontShowIfTitleContains": ["kokous", "ompelu"],
    "dontShowEvents": []
  },
  {
    "text": "vuosijuhlat",
    "searchAttributes": ["vuosijuhlat", "vujut", "vuosijuhla"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
  {
    "text": "fuksit",
    "searchAttributes": ["fuksi", "fuksit"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
  {
    "text": "beer pong",
    "searchAttributes": ["beer pong", "beerpong", "pongi"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
  {
    "text": "liikunta",
    "searchAttributes": ["jumppa", "liikunta", "urheilu"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
  {
    "text": "bileet",
    "searchAttributes": ["bile", "bileet"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
  {
    "text": "risteily",
    "searchAttributes": ["risteily", "risteilemään", "laiva"],
    "dontShowIfTitleContains": ["kokous"],
    "dontShowEvents": []
  },
]


let organizers = [
  {
    "name": "Nylands Nation (NN)",
    "fbpage_id": 427825730567377,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Eteläsuomalainen osakunta (ESO)",
    "fbpage_id": 203089906382729,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Savolainen Osakunta (SavO)",
    "fbpage_id": 160061217353643,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Karjalainen Osakunta (KO)",
    "fbpage_id": 1430358083854050,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Hämäläis-Osakunta (HO)",
    "fbpage_id": 420221918176511,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Keskisuomalainen Osakunta (KSO)",
    "fbpage_id": 952582368096934,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Kymenlaakson Osakunta (KyO)",
    "fbpage_id": 156528024373997,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Åbo Nation (ÅN)",
    "fbpage_id": 110681812285714,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Varsinaissuomalainen osakunta (VSO)",
    "fbpage_id": 171240902893088,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Satakuntalainen Osakunta (SatO)",
    "fbpage_id": 252611788121522,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Wiipurilainen Osakunta (WiO)",
    "fbpage_id": 442841242422779,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Östra Finlands Nation (ÖFN)",
    "fbpage_id": 136989603030148,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Etelä-Pohjalainen Osakunta (EPO)",
    "fbpage_id": 189440421086954,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Vasa Nation (VN)",
    "fbpage_id": 167158043395,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Pohjois-Pohjalainen Osakunta (PPO)",
    "fbpage_id": 182593088444921,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Osakuntien yhteisvaltuuskunta (OYV)",
    "fbpage_id": 128192767194548,
    "gategory": "",
    "type": "Osakunnat"
  },
  {
    "name": "Teologian Ylioppilaiden Tiedekuntayhdistys",
    "fbpage_id": 224816494199994,
    "gategory": "Teologinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Codex",
    "fbpage_id": 171944356256355,
    "gategory": "Oikeustieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Justus ",
    "fbpage_id": 729044597236608,
    "gategory": "Oikeustieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Pykälä ry - Oikeustieteen ylioppilaiden yhdistys",
    "fbpage_id": 304441739572900,
    "gategory": "Oikeustieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Lääketieteenkandidaattiseura ",
    "fbpage_id": 170089036445267,
    "gategory": "Lääketieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Humanisticum ry",
    "fbpage_id": 211704412224144,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Aistimus ry ",
    "fbpage_id": 180433332083605,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Bouffe ",
    "fbpage_id": 1636563939898080,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Dilemma ",
    "fbpage_id": 150776265131814,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Divina Compagnia ",
    "fbpage_id": 449101308608085,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Eidos ",
    "fbpage_id": 117907671677782,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Fibula ",
    "fbpage_id": 1477803332298602,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Historicus ",
    "fbpage_id": 127541777311945,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Karavaani ",
    "fbpage_id": 1039202856092987,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "KouKi ry ",
    "fbpage_id": 159587290757473,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kronos ",
    "fbpage_id": 1678854439031114,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Lycksalighetens Ö ",
    "fbpage_id": 1906374529636046,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Mythos ",
    "fbpage_id": 890521651017637,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "NEFA-Helsinki ry. ",
    "fbpage_id": 166040816744584,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Putkinotko ",
    "fbpage_id": 701225340068702,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Repliikki ",
    "fbpage_id": 249334878444093,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Rupla ",
    "fbpage_id": 416794791703397,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Sasha",
    "fbpage_id": 108823852517738,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Setenta ",
    "fbpage_id": 1576227912620563,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Skald",
    "fbpage_id": 480107295359170,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Umlaut ",
    "fbpage_id": 785969824748138,
    "gategory": "Humanistinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Matlu ry ",
    "fbpage_id": 440988002959778,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Limes",
    "fbpage_id": 159230817852217,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Geysir ",
    "fbpage_id": 549267891908363,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Helsingin Yliopiston Kemistit ry ",
    "fbpage_id": 799123276908704,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Maantieteen opiskelijat ",
    "fbpage_id": 132881486904401,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Matrix ry ",
    "fbpage_id": 258975124205023,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Resonanssi ",
    "fbpage_id": 313512168760454,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Synop ",
    "fbpage_id": 253037448091949,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "TKO-äly ",
    "fbpage_id": 175686629125957,
    "gategory": "Matemaattis-luonnontieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Yliopiston farmasiakunta",
    "fbpage_id": 114866841904743,
    "gategory": "Farmasian tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Biosfääri ry",
    "fbpage_id": 163365223693020,
    "gategory": "Bio- ja ympäristötieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "BOA ry ",
    "fbpage_id": 176484659066453,
    "gategory": "Bio- ja ympäristötieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Natura ry ",
    "fbpage_id": 293601907354152,
    "gategory": "Bio- ja ympäristötieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Condus ry",
    "fbpage_id": 221877677868485,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Aikuiskasvatuksen Kilta ",
    "fbpage_id": 437389792974454,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Allofoni ry ",
    "fbpage_id": 134404759940270,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "EBE ",
    "fbpage_id": 285505942123,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Erikeepperi ",
    "fbpage_id": 117283758339734,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Foni Ry ",
    "fbpage_id": 1374665302854714,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Intelligenzia ",
    "fbpage_id": 585506438216500,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kompleksi ",
    "fbpage_id": 606765176175476,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kopeda ",
    "fbpage_id": 1412316612405220,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Peduca ",
    "fbpage_id": 198056626957963,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Phenomena ",
    "fbpage_id": 370203146328055,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Tekstiilarit",
    "fbpage_id": 672467696197267,
    "gategory": "Käyttäytymistieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kannunvalajat ry.",
    "fbpage_id": 103357879701983,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Habitus ",
    "fbpage_id": 746328262197928,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kansantaloustieteen opiskelijat ",
    "fbpage_id": 187347961314922,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kehitysmaatutkimuksen opiskelijat ",
    "fbpage_id": 215353735288977,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Kontakti ry ",
    "fbpage_id": 1731148370466601,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Mana ry. - Sosiaali- ja kulttuuriantropologian ainejärjestö ",
    "fbpage_id": 110811792335059,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },

  {
    "name": "Moodi ",
    "fbpage_id": 195948560421434,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Status ",
    "fbpage_id": 131854537457,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Stigma ry. ",
    "fbpage_id": 158797267493102,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  },
  {
    "name": "Stydi ry",
    "fbpage_id": 539795719389314,
    "gategory": "Valtiotieteellinen tiedekunta",
    "type": "Tiedekunta- ja ainejärjestöt"
  }, 
  {
   "name": "Valtio-opin opiskelijat",
   "fbpage_id": 216926405084423,
   "gategory": "Valtiotieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Maatalous-metsäylioppilaiden liitto ry",
   "fbpage_id": 194812483886222,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Agro-Forst ",
   "fbpage_id": 1007074909375158,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Lipidi ",
   "fbpage_id": 201194693239830,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Markkina-Agraarit ",
   "fbpage_id": 1716388508581217,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Metsäylioppilaat ",
   "fbpage_id": 879039012184432,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Oikos ",
   "fbpage_id": 1606482893009937,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Sampsa ",
   "fbpage_id": 168676149859463,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Viikin taloustieteilijät",
   "fbpage_id": 172909282731720,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Viri Lactis ",
   "fbpage_id": 244264448975220,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Voluntas ",
   "fbpage_id": 451383025010533,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Vuorovaikeutus ",
   "fbpage_id": 273982539384210,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Ympäristötieteiden opiskelijat MYY ry",
   "fbpage_id": 211224148903297,
   "gategory": "Maatalous-metsätieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Eläinlääketieteen kandidaattiyhdistys",
   "fbpage_id": 585535938191031,
   "gategory": "Eläinlääketieteellinen tiedekunta",
   "type": "Tiedekunta- ja ainejärjestöt"
   }, 
  {
   "name": "Akateeminen Laulu",
   "fbpage_id": 143613869008718,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Akateeminen Puhallinorkesteri",
   "fbpage_id": 496731520384987,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Eteläsuomalaisen Osakunnan Laulajat (EOL)",
   "fbpage_id": 165281176829702,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "HOS Big Band",
   "fbpage_id": 191386474295861,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Humanistispeksi",
   "fbpage_id": 167294359974425,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Hämäläis-Osakunnan Laulajat (HOL)",
   "fbpage_id": 106721329367913,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Kuokkavieraat",
   "fbpage_id": 178319182224947,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Käyttäytymistieteellinen speksi",
   "fbpage_id": 172147169557481,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Metsoforte",
   "fbpage_id": 124840604258807,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Pohjalaisten Osakuntien Laulajat (POL)",
   "fbpage_id": 118462768332674,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Satakuntalaisen Osakunnan kuoro",
   "fbpage_id": 899031746802259,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Savolaisen Osakunnan Laulajat (SOL)",
   "fbpage_id": 116524421746804,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Savolaisen Osakunnan Soitannollinen Seura SOSSu",
   "fbpage_id": 124009637621234,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Studentteatern",
   "fbpage_id": 200534829958369,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Thespians Anonymous",
   "fbpage_id": 171094276239413,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Valkotakit ry",
   "fbpage_id": 677466372406931,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Valtsikan speksi",
   "fbpage_id": 348046728547289,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Wiipurilaisen Osakunnan Laulajat (WiOL)",
   "fbpage_id": 276567229105522,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Ylioppilaskunnan Soittajat (YS)",
   "fbpage_id": 292715337424953,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Ylioppilasteatteri",
   "fbpage_id": 246585515355815,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "Äänenkannattajat",
   "fbpage_id": 278191812512170,
   "gategory": "",
   "type": "Kuorot, orkesterit ja teatterit"
   }, 
  {
   "name": "HYY:n Elokuvaryhmä ry.",
   "fbpage_id": 182778095087709,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Helsingin yliopiston teknokulttuurin ystävät",
   "fbpage_id": 293833960630962,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Helmut",
   "fbpage_id": 345900505526959,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Alter Ego",
   "fbpage_id": 203953793068781,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Salamurhaajien kilta",
   "fbpage_id": 979516865401187,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "YliGo",
   "fbpage_id": '467096029977319',
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Helsingin yliopiston pelaajat",
   "fbpage_id": 494945383860648,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Hyvät Martat ry",
   "fbpage_id": 349163785196402,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Åländska Studentföreningen",
   "fbpage_id": 120729191338080,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Helsingin yliopiston partiolaiset",
   "fbpage_id": 785288214908610,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Mentor-klubi",
   "fbpage_id": 114705138607428,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Helsingin Akateemiset Ulkoiluttajat",
   "fbpage_id": 124266360975343,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  // {
 //  "name": "Akateeminen viiniseura",
 //  "fbpage_id": 315841701803647,
 //  "gategory": "",
 //  "type": "Harrastejärjestöt"
 //  }, 
  {
   "name": "Akateeminen Jaloviinakerho",
   "fbpage_id": 1424134604491966,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Lapselliset",
   "fbpage_id": 124737230929447,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
  {
   "name": "Debating Society",
   "fbpage_id": 103125323135815,
   "gategory": "",
   "type": "Harrastejärjestöt"
   }, 
   {
    "name": "Helsingin yliopiston ylioppilaskunta",
    "fbpage_id": 275038856985,
    "gategory": "",
    "type": "Muut"
    }, 
    {
     "name": "Limeksen appro",
     "fbpage_id": 338222509565589,
     "gategory": "",
     "type": "Muut"
     }, 
     {
      "name": "Bileinsinöörit",
      "fbpage_id": 1472110096334118,
      "gategory": "",
      "type": "Muut"
      }
]

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
