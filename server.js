const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  console.log(req.query)
  console.log('_')
  res.status(200).send('hello')
})

app.listen(3000, () => {
  console.log('started')
})
