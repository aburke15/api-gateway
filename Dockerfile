FROM node:15

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

COPY src /app/src

RUN npm install && npm install -g typescript

EXPOSE 80

CMD ["node", "./src/index.ts"]