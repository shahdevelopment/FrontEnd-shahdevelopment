FROM node:lts-alpine3.18

ARG map_key
ENV api_key_new="$map_key"

ARG jwt_secret
ENV JWT_SECRET="$jwt_secret"

ARG back_end
ENV BACK_END="$back_end"

ARG site_domain
ENV SITE_DOMAIN="$site_domain"




ARG ENVIRONMENT

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update \
    && apk add --no-cache ca-certificates \
    && apk add --no-cache bash \
    && apk add --no-cache curl \
    && rm -rf /var/cache/apk/*

RUN if [ "$ENVIRONMENT" = "dev" ]; then \
        npm install axios && \
        npm install fs; \
    else \
        npm install --only=production && \
        npm cache clean --force; \
    fi

COPY . .

CMD ["node", "index.js"]

# Build the application (assuming your app uses a build process)
# RUN npm run build