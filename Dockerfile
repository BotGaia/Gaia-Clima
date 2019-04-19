FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i nodemon -g
COPY . /app
ARG IP_ADDRESS
ENV IP_ADDRESS=$IP_ADDRESS
CMD npm run dev
EXPOSE 3000