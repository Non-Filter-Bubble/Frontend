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

# 두 번째 단계: nginx를 사용하여 웹 서버 설정
FROM nginx:latest AS production

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 첫 번째 단계에서 생성된 빌드 파일을 nginx의 정적 파일 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 포트 설정
EXPOSE 80

# nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
