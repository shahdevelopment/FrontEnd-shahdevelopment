FROM node:lts-alpine3.18
# Set environment variables
ARG map_key
ENV api_key_new="$map_key"
# Set the working directory
WORKDIR /usr/src/app
ARG ENVIRONMENT
# Install deps
RUN apt update
RUN apt install ca-certificates && apt autoremove

# RUN npm install
# If you are building your code for production

COPY package*.json .

# RUN npm install axios && npm ci --only=production
RUN if [ "$ENVIRONMENT" = "dev" ]; then npm install axios && npm install fs; else npm install --only=production; fi
# && npm cache clean --force

# USER node

COPY . .

CMD ["node", "index.js"]

# Build the application (assuming your app uses a build process)
# RUN npm run build