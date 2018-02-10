const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const Post =  require('./models/Post')
const User = require('./models/User')
const postsRoute = require('./routes/posts')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/posts', postsRoute)


app.listen(3000, () => {
  console.log('started')
})
