FROM node:22-alpine

WORKDIR /app

COPY package.json .

COPY server.js .

EXPOSE 3000

RUN npm install

ENTRYPOINT ["npm"]

CMD ["run","start"]