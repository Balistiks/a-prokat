FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @vue/cli -g

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]