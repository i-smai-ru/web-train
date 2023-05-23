FROM node:20.2.0
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
