const db =require('../db')
const Post = {
  get: async (id) => {
    const posts = await db('posts').where({ id })
    return posts[0]
  },
  list: async() => {
    const posts = await db('posts').select()
    return posts
  },
  listByUserId: async (userId) => {
    if(!userId){ return []}
    return db('posts').where({ userId })
  },
  create: async(userId, title, content) => {
    const ids = await db('posts')
      .insert({
        userId, title, content
    })
    const post = await Post.get(ids[0])

    return post
  }
}

//const f = async () => {
//  const p = await Post.get(18)
//  console.log(p)
//}
//f()
module.exports = Post
