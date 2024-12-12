# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source and build
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:latest

# Copy the build files from the previous stage into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html/

# Copy the custom nginx.conf to replace the default one
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
