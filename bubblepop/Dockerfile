# 빌드 단계
FROM node:14 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# 의존성 설치 및 빌드
RUN npm install
RUN npm run build

# 실행 단계
FROM nginx:alpine

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 React 애플리케이션 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
