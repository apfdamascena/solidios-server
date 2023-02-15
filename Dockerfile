FROM node:latest
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json ./

RUN npm install pg
RUN npm install axios
RUN npm install node-cron
RUN npm install morgan
RUN npm install xlsx
RUN npm install collect.js
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3001

CMD [ "npm", "run", "dev" ]