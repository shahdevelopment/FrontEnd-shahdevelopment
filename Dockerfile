FROM node:14
# Set environment variables
ENV api_key_new=AIzaSyBM96ZlN_58vdEA7F5hbOyZSLkq_4Q5OuQ
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

RUN npm install axios && npm ci --only=production
# && npm cache clean --force

USER node

# ADD requirements.txt ./
COPY . .

# Build the application (assuming your app uses a build process)
# RUN npm run build

CMD ["node", "index.js"]