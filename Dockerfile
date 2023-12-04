FROM node:14

# Set the working directory
WORKDIR /app

# Install create-react-app globally
RUN npm install -g create-react-app

# Expose port 3000
EXPOSE 3000
EXPOSE 8080

# Run the app
CMD ["/bin/bash"]