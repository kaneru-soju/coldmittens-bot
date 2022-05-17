# base
FROM node:alpine
RUN apk add git

# directory for the container
WORKDIR /usr/src/app

# install packages
COPY package.json ./
RUN yarn install

# copy appropriate files
COPY cookies/ fortunes/ config.json package-lock.json ./
COPY src/ ./src/

# run the bot
CMD ["node", "./src/index.js"]