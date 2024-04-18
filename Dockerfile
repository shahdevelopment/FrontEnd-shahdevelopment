FROM alpine:3.18
# Set environment variables

ARG map_key
ENV api_key_new="$map_key"
# Set the working directory
WORKDIR /usr/src/app
ARG ENVIRONMENT
# Install deps
# RUN apk update

# Create Certificate
# RUN apk install ca-certificates && apk autoremove

# Install deps
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh

# Create Certificate
RUN apk add --no-cache ca-certificates && \
    apk del --no-cache .build-deps
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