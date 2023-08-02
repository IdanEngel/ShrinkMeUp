FROM node:14 AS Production

WORKDIR /usr/src/client

COPY  package.json .
COPY  package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["sh", "-c", "npm run dev -- --host"]