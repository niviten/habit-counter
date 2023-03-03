const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = 3333

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1/habit', require(path.join(__dirname, 'routers', 'habit')))

app.all('/test', (req, res) => {
  const { name, age } = req.body
  res.send({ msg: `Hi ${name}. Your age is ${age}.` })
})

app.all('/test/db', async (req, res) => {
  const { select } = require('./helpers/database')
  const query = 'SELECT * FROM HCTestTable'
  try {
    const tests = await select(query)
    res.send(tests)
  } catch (err) {
    res.send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server started @${PORT}`)
})
