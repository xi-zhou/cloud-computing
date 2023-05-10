FROM node:alpine
#RUN mkdir /exercise02/server
WORKDIR /exercise02/server
COPY . .
RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]