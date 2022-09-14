FROM node:14

WORKDIR /client

COPY package.json .

RUN npm install

COPY . .

VOLUME [ "/client/node_modules" ]

CMD ["npm", "run", "start"]
