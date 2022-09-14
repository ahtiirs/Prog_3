FROM node:14

WORKDIR /server

COPY package.json .

RUN npm i

COPY . .

VOLUME [ "/server/node_modules" ]

CMD ["npm", "start", "run"]
