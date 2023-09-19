FROM node:alpine

# Set environment variables
ENV api_key_new=AIzaSyBM96ZlN_58vdEA7F5hbOyZSLkq_4Q5OuQ
#     user_password=h4b32hi4b32ihbr34itb43ugb3uqgbo38g7oq53w85h8oqeriuh2f793
# Set the working directory
WORKDIR /usr/src/app
ARG ENVIRONMENT
# Install deps
RUN apk update

# Create Certificate
RUN apk install ca-certificates

# RUN npm install
# If you are building your code for production

COPY package*.json .

RUN if [ "$ENVIRONMENT" = "dev" ]; then npm install axios && npm install fs; else npm install --only=production; fi
# RUN npm install axios && npm ci --only=production
# && npm cache clean --force

# USER node

# ADD requirements.txt ./
COPY . .

# Build the application (assuming your app uses a build process)
# RUN npm run build

CMD ["node", "index.js"]