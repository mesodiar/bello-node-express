const path = require('path')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'db.sqlite')
  },
  useNullAsDefault: true //for only sqlite
})

module.exports = knex
