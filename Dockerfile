FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3069
CMD node src/index.js