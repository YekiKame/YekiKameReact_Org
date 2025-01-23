# Stage 1: Build the React application
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 5000
EXPOSE 5000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
