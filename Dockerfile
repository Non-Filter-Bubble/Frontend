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

# 두 번째 단계: Node.js 기반의 간단한 웹 서버 이미지 사용하여 애플리케이션 실행
FROM node:14 AS production

# 작업 디렉토리 설정
WORKDIR /app

# 첫 번째 단계에서 생성된 빌드 파일을 노드 기반의 간단한 웹 서버로 복사
COPY --from=build /app/build /app

# 필요한 경우, 간단한 웹 서버를 설치하고 실행할 수 있는 커맨드
CMD ["npx", "http-server", "-p", "80"]
