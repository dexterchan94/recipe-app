const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

const RECIPES = [
  {
    id: 1,
    title: 'Mashed Potatoes'
  },
  {
    id: 2,
    title: 'Roasted Potatoes'
  }
]

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/recipes', (req, res) => {
  res.json(RECIPES)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
