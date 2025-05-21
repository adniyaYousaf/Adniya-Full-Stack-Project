# Build client
FROM node:20 AS builder

WORKDIR /app

COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Build server
FROM node:20

WORKDIR /app

# Copy only server package.json and install ALL dependencies (not just prod)
COPY server/package*.json ./
RUN npm install

# Copy the rest of the server code
COPY server/ ./

# Copy static files built from client
COPY --from=builder /app/server/static ./static
COPY .env ./


EXPOSE 3000
CMD ["node", "server.js"]
