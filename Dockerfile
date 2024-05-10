# 첫 번째 단계: Node.js 환경에서 애플리케이션 빌드
FROM node:14-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사하여 종속성 설치
COPY package*.json ./

RUN npm install

# 애플리케이션 소스코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Nginx 이미지 사용하여 애플리케이션 실행
FROM nginx:alpine

# Nginx의 기본 사이트 구성 파일을 백업
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak

# Dockerfile이 있는 디렉토리에서 Nginx 사이트 구성 파일을 복사
COPY nginx.conf /etc/nginx/conf.d/

# 첫 번째 단계에서 생성된 빌드 파일을 Nginx에 복사
COPY --from=build /app/build /usr/share/nginx/html

# 포트 80을 열고 Nginx 실행
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


