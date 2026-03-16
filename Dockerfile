FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# App runs on port 3000 internally, map to port 80 with: docker run -p 80:3000
EXPOSE 3000

CMD ["node", "server.js"]
