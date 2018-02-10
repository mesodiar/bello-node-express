const express = require('express')

const router = express.Router()
const Post =  require('../models/Post')
const User = require('../models/User')

router.get('/', async (req, res) => {
  const posts = await Post.list()

  for (const post of posts) {
    post.user = await User.get(post.userId)
  }
  res.json(posts)
})

router.get('/:id', async (req, res) => {
  const posts = await Post.get(req.params.id)
  if (!posts){
    res.sendStatus(404)
  }
  posts.user = await User.get(posts.userId)
  res.json(posts)
})

//Create Post
router.post('/posts', async (req, res) => {
  const post = await Post.create(1,
  req.body.title, req.body.content)
  res.json(post)

})

module.exports = router
