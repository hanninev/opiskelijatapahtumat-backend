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


app.get('/events', async (req, res) => {
  const auth = await axios.get("https://graph.facebook.com/oauth/access_token?client_id=" + appId + "&client_secret=" + appSecret + "&grant_type=client_credentials")
  const token = auth.data.access_token

  const allPages = await organizers.map(async p => {
    // console.log(p)
    const requestCurrentPage = await axios.get('https://graph.facebook.com/v2.11/' + p.fbpage_id + '?fields=events.limit(10){start_time,name,owner,place}&access_token=' + token)
    if (requestCurrentPage.data.events !== undefined) {
    return requestCurrentPage.data.events.data
    } else {
      return []
    }
  })
  const unMerged = await Promise.all(allPages) 
  const merged = [].concat.apply([], unMerged) // tän voisi tehdä frontissa?
  res.json(merged)
})

app.get('/organizers', async (req, res) => {
  res.json(organizers)
})

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)

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
    "name": " Mana ry. - Sosiaali- ja kulttuuriantropologian ainejärjestö ",
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
  }
]

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
