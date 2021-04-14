FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

# this stuff is for typescript
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

# exposing the port specified in the .env
EXPOSE 3069
CMD node src/index.js