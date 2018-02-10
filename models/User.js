const db =require('../db')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const SECRET = 'QWERTY'

const User = {
  get: async (id) => {
    const users = await db('users').where({ id })
    const user = users[0]

    return _.omit(user, 'password')
  },

  //check username, password
  //if valid, return token
  auth: async(username, password) => {
    const hashed = crypto.createHmac('sha256', SECRET).update(password).digest('hex')
    const users = await db('users').where({ 
      username,
      password: hashed
    })
    const user = users[0]
  
  if (!user){
    return null
  }
  //check if password match
  return jwt.sign({
    userId: user.id
  }, SECRET)
},
  getByToken: async (token) => {
    try{
      const payload = jwt.verify(token, SECRET)
      const user = await User.get(payload.userId)
      return user
    }
    catch(err){
      if (err.name === "JsonWebTokenError"){
        return null
      }
      throw err
    }
  }
}

//const f = async () => {
//  const p = await Post.get(18)
//  console.log(p)
//}
//f()
module.exports = User
