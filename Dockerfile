FROM node:16-alpine

WORKDIR /wbd_project

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3001

CMD npm start