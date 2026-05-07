# Stage 1: Build the React app
FROM node:20-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .
RUN npm run build

# Stage 2: Serve with Node/Express
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]