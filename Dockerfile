FROM node:20-alpine AS build

WORKDIR /application

COPY application/package*.json ./

RUN npm ci

COPY application/ ./

RUN npm run build


FROM nginx:1.27-alpine

COPY --from=build /application/build /usr/share/nginx/html

COPY /nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
