# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port 8080 (mapped later in docker-compose.yml)
EXPOSE 8080

# Start Vite on all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]
