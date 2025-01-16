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

app.get('/list/:position?', async (req, res) => {
  try {
    const position = req.params.position; // position 값 가져오기

    if (!position) { // position 값이 없을 때
      return res.render('position_list.ejs');
    }

    const query = { position: position.toUpperCase() }; // position 값이 있을 때 쿼리 조건 설정
    const result = await db.collection('players').find(query).toArray(); // 쿼리 실행
    res.render('list.ejs', { result: result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // 에러 처리
  }
});

app.get('/list/:position/:name', async (req, res) => {
  try {
    const position = req.params.position.toUpperCase(); // positon 가져오기
    const playerName = req.params.name; // name 가져오기

    // MongoDB 쿼리 조건
    const query = { 
      position: position, 
      name: playerName 
    };

    // 해당 데이터 조회
    const result = await db.collection('players').findOne(query);

    if (!result) {
      // 데이터가 없을 경우 에러 처리
      return res.status(404).send(`<h1>Player "${playerName}" in position "${position}" not found</h1>`);
    }

    // detail.ejs에 데이터 전달
    res.render('detail.ejs', { result: result });
  } catch (err) {
    // 서버 에러 처리
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
