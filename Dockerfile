# base image
FROM node:latest

# set the working directory
WORKDIR /usr/src/app
# copy the node project config
COPY package*.json ./
# install the dependent packages
RUN npm install

# get the app sources
COPY ./ ./

# reassign env vars to connect to redis inside of the container correctly
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV LOG_LEVEL=info

CMD ["npm", "start"]