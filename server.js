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

app.get('/list/:position', async (req, res) => {
  try {
    const position = req.params.position; // position 값 가져오기
    let query = {};

    // position 값이 존재하면 쿼리 조건 추가
    if (position) {
      query = { position: position.toUpperCase() }; // 대소문자 무시
    }

    const result = await db.collection('players').find(query).toArray(); // 쿼리 실행
    res.render('list.ejs', { result: result }); // 결과를 렌더링
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // 에러 처리
  }
});

app.get('/detail/:name', async (req, res) => {
  try {
    const playerName = req.params.name; // name 가져오기
    const result = await db.collection('players').findOne({ name: playerName });

    if (!result) {
      // 에러 처리
      return res.status(404).send(`<h1>Player "${playerName}" not found</h1>`);
    }
    res.render('detail.ejs', { result: result });
  } catch (err) {
    // 에러 처리
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});