# Stage 1: Build the React app
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Node/Express
FROM node:18-alpine
WORKDIR /app

RUN npm install -g express

COPY --from=build /app/build ./build
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]