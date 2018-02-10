const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
 } = require('graphql')

 const Post = require('../models/Post')
 const User = require('../models/User')

 const UserType = new GraphQLObjectType({
     name: 'User',
     fields: () => ({ //help to not run this first but run when it is called because User uses PostType
         id: {type: GraphQLID},
         username: { type: GraphQLString },
         posts: { 
            type: new GraphQLList(PostType),
            resolve: (user) => Post.listByUserId(user.id)
        }
     })
 })

 const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        user: {
            type: UserType,
            resolve: (post) => User.get(post.userId)
        }
    }
 })

const QueryType =  new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: async () => {
                return 'hello!'
            }
        },
        posts: {
            type: new GraphQLList(PostType), //[Post]
            resolve: () => Post.list()
        }
    }
})

const schema = new GraphQLSchema({
    query: QueryType
})

module.exports = schema