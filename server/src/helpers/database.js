const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbFilePath = path.join(__dirname, '..', '..', 'datastore', 'database.db')
const db = new sqlite3.Database(dbFilePath)

function select(...args) {
  return new Promise((resolve, reject) => {
    db.all(...args, (err, rows) => {
      if (err) {
        reject(err)
        return
      }
      resolve(rows)
    })
  })
}

module.exports = { select }
