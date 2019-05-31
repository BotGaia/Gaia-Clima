FROM node:alpine
RUN mkdir /app
WORKDIR /app
ENV ENVIRONMENT=dev
COPY package*.json /app/
RUN npm install
RUN npm i nodemon -g
COPY . /app
CMD npm run dev
EXPOSE 3000