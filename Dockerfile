FROM node:alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --omit=dev

# Copy application files
COPY server.js index.html ./

# Expose port 3000
EXPOSE 80

# Start the application
CMD ["npm", "start"]
