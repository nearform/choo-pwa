FROM node:9

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]