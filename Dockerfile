FROM node:alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY server.js index.html ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
