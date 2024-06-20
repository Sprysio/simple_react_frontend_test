FROM node:14-alpine AS build

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY simple-frontend/package*.json ./

RUN npm install

COPY /simple-frontend .
     
RUN npm run build



FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]