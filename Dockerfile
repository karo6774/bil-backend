FROM node:lts

COPY package.json .
COPY tsconfig.json .
COPY /src ./src

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
