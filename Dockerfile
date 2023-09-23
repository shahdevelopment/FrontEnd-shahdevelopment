FROM node

# Set environment variables
ENV api_key_new="$api_maps_key"
# Set the working directory
WORKDIR /usr/src/app
ARG ENVIRONMENT
# Install deps
RUN apt-get update

# Create Certificate
RUN apt-get install ca-certificates && apt autoremove

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