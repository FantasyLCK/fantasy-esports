const express = require('express')
const app = express()

const { MongoClient } = require('mongodb')

// ejs 세팅
app.set('view engine', 'ejs')

// body 세팅
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// css, js, 이미지 파일 연동
app.use(express.static(__dirname + '/public'))

let db
const url = 'mongodb+srv://admin:admin00@cluster0.dmb9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

new MongoClient(url).connect().then((client) => {
  console.log('Successfully connected to MongoDB') // DB 통신
  db = client.db('database')
  app.listen(3000, () => {
    console.log('Express is running on http://localhost:3000') // 서버 통신
})
}).catch((err) => {
  console.log(err)
})

// 메인 페이지 불러오기
app.get('/', (req, res) => {
    res.render('index.ejs')
})