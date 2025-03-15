FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install && rm package-lock.json

COPY . .

RUN npm cache clean --force

RUN npx tsc 

EXPOSE 3000

CMD ["npm", "start"]