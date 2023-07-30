FROM node:latest
# Set environment variables
# ENV user_email=test@mail.shahdevelopment.tech \
#     user_password=h4b32hi4b32ihbr34itb43ugb3uqgbo38g7oq53w85h8oqeriuh2f793
# Set the working directory
WORKDIR /usr/src/app

# Install deps
RUN apt-get update

# Create Certificate
RUN apt-get install ca-certificates

# RUN npm install
# If you are building your code for production

COPY package*.json .

RUN npm ci --only=production

USER node

# ADD requirements.txt ./
COPY . .

CMD ["node", "index.js"]