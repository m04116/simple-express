FROM node:18-alpine

WORKDIR /home/ubuntu/server

RUN npm update -g npm

COPY package*.json .

RUN npm install

COPY . .
