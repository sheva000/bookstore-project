# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file for dependency installation
COPY package*.json ./

# Install dependencies (native modules are compiled here)
RUN npm install
RUN npm install bcryptjs

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start:dev"]
