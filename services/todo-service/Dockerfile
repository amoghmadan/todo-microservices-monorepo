# Use Node 24 Bookworm Slim as base image
FROM node:24-bookworm-slim

# Set username and home path
ARG USERNAME=todo \
    HOME=/home/$USERNAME

# Create a new user and group called 'user'
RUN groupadd -r $USERNAME && useradd -r -g $USERNAME -m -d $HOME $USERNAME

# Set the working directory to the app location and change ownership
WORKDIR $HOME/todo-service
RUN chown -R $USERNAME:$USERNAME $HOME/todo-service

# Switch to the new user
USER $USERNAME

# Copy the application code
COPY --chown=$USERNAME:$USERNAME . .

# Install dependencies
npm i --location=project

CMD ["npm", "start"]
