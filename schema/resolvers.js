const Post =require('../models/Post')
const User = require('../models/User')

module.exports = {
    Post: {
        user: (post) => User.get(post.userId)
    },
    Query: {
        hello: () => 'hello Apollo!',
        posts: () => Post.list(),
        post: (obj, args) => { 
            //const id = args.id
            const { id } = args
            return Post.get(id)
        }
    },
    User: {
        posts: (user) => Post.listByUserId(user.id)
    },
    Mutation: {
        createPost: (obj, args) => {
            return Post.create(args.userId, args.title, args.content)
        } 
    }
}