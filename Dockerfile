# # 첫 번째 단계: Node.js 환경에서 애플리케이션 빌드
# FROM node:14-alpine AS build

# # 작업 디렉토리 설정
# WORKDIR /app

# # package.json 및 package-lock.json 복사하여 종속성 설치
# COPY package*.json ./

# RUN npm install

# # 애플리케이션 소스코드 복사
# COPY . .

# # 애플리케이션 빌드
# RUN npm run build

# # 두 번째 단계: Nginx 이미지 사용하여 애플리케이션 실행
# FROM nginx:alpine

# # 첫 번째 단계에서 생성된 빌드 파일을 Nginx에 복사
# COPY --from=build /app/build /usr/share/nginx/html

# # 포트 80을 열고 Nginx 실행
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:14 AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package-lock.json ./
COPY package.json ./
# Installs all node packages
RUN npm ci 


# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:1.19.0
#copies React to the container directory
# Set working directory to nginx resources directory
# WORKDIR /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
# Remove default nginx static resources
RUN rm -rf ./usr/share/nginx/html/*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html/
# Containers run nginx with global directives and daemon off
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]