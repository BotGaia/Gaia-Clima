FROM node:latest
RUN mkdir /app
WORKDIR /app
ARG API_KEY
ENV API_KEY=${API_KEY}
COPY package*.json /app/
RUN npm install
RUN npm i nodemon -g
COPY . /app
CMD npm run dev
EXPOSE 3000