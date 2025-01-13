const express = require('express')
const app = express()

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:admin00@cluster0.dmb9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

new MongoClient(url).connect().then((client) => {
  console.log('Successfully connected to MongoDB')
  db = client.db('database')
  app.listen(3000, () => {
    console.log('Express is running on http://localhost:3000')
})
}).catch((err) => {
  console.log(err)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main/index.html')
})