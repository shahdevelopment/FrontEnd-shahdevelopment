FROM node

ARG map_key
ENV api_key_new="$map_key"
ARG ENVIRONMENT
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get install -y ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/* && apt-get autoremove -y
COPY package*.json .
# RUN npm install axios && npm ci --only=production
RUN if [ "$ENVIRONMENT" = "dev" ]; then npm install axios && npm install fs; else npm install --only=production && npm cache clean --force; fi
COPY . .

CMD ["node", "index.js"]
# Build the application (assuming your app uses a build process)
# RUN npm run build