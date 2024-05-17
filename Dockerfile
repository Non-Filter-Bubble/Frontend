# 첫 번째 단계: Node.js 환경에서 애플리케이션 빌드
FROM node:14 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사하여 종속성 설치
COPY package*.json ./

RUN npm install

# 애플리케이션 소스코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Express.js를 사용하여 웹 서버 실행
FROM node:14 AS production

# 작업 디렉토리 설정
WORKDIR /app

# 첫 번째 단계에서 생성된 빌드 파일을 노드 기반의 Express.js 웹 서버로 복사
COPY --from=build /app/build /app

# Express.js 서버 설정 및 애플리케이션 실행
CMD ["node", "-e", "\
const express = require('express');\
const path = require('path');\
\
const app = express();\
\
app.use(express.static(path.join(__dirname, 'build')));\
\
app.get('/', (req, res) => {\
  res.sendFile(path.join(__dirname, 'build', 'index.html'));\
});\
\
app.get('/join', (req, res) => {\
  res.sendFile(path.join(__dirname, 'build', 'join.html'));\
});\
\
const PORT = process.env.PORT || 80;\
app.listen(PORT, () => {\
  console.log(`Server is running on port ${PORT}`);\
});\
"]
