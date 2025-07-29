# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install TypeScript globally for building
RUN npm install -g typescript

# Copy the source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Remove development dependencies and TypeScript to reduce image size
RUN npm prune --production && npm uninstall -g typescript

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
