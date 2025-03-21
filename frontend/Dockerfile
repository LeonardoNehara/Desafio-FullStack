# Usa a imagem do Node.js 20.11 como base
FROM node:20.11-alpine

# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./

# Limpa o cache
RUN npm cache clean --force

RUN npm config set fetch-timeout 60000

# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]