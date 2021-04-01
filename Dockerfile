FROM node:15

WORKDIR /app/src

COPY package*.json ./
COPY tsconfig*.json ./

COPY src /app/src

RUN npm install

EXPOSE 80

CMD ["node", "./src/index.ts"]