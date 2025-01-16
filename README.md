# Fantasy LCK - Web 개발 코드

## 디렉토리 구조 (node_modules 제외)
```
fantasy-esports
├─ README.md
├─ Information.md // 프로젝트 정보 파일
├─ json // 기본 DB 폴더
│  ├─ players.json
│  └─ teams.json
├─ package-lock.json
├─ package.json
├─ public // 정적 파일 폴더 (css, js, Sass, 이미지)
│  ├─ Sass
│  │  └─ main.scss
│  ├─ css
│  │  ├─ bootstrap.min.css
│  │  ├─ main.css
│  │  └─ main.css.map
│  ├─ img
│  │  ├─ logo-icon.svg
│  │  └─ main-bg.png
│  └─ js
│     └─ bootstrap.bundle.min.js
├─ server.js // 서버 파일
└─ views // html 페이지 폴더 (ejs 사용)
   └─ index.ejs
```

# 개발 예정 기능
- 로그인/회원가입
  - 구글/디스코드 계정으로 로그인
- 로스터 확인
  - 등록한 TOP/JGL/MID/BOT/SPT 선수 확인
  - 팀 케미스트리/팀순위 부스트/POG 부스트 사항 확인
- 선수 검색
  - 선수 이름으로 검색
  - 포지션/소속팀 필터 기능
- 알림창
  - 패치노트/공지사항 알림
- 친구 관리
  - 서버 내 유저 간 친구 추가/관리
- 매치업(친선/일반)
  - 친선: 등록된 친구와 매치업
  - 일반: 서버 내에서 랜덤 유저와 매치업
- 랭킹
  - 팀 가치 총합/매치업 승률 순위 표시
- 커뮤니티 채팅
  - 서버 내 이용자들과 채팅
  - '내 로스터' 공유 기능
- 튜토리얼
- 계정 정보 페이지