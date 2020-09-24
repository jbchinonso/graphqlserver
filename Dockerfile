FROM node:12

WORKDIR /var/www/graphql

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn tsc

EXPOSE 3000

CMD ["yarn", "start"]

