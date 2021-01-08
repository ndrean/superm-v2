FROM node:14-alpine3.12 as builder
COPY package.json yarn.lock ./
RUN yarn install --only=prod \
   && mkdir /react-app \
   && mv ./node_modules ./react-app
WORKDIR /react-app
COPY . .
RUN yarn build


FROM nginx:1.19.6-alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=builder /react-app/build ./
RUN rm /var/log/nginx/access.log \ 
   && rm /var/log/nginx/error.log \ 
   && ln -s /dev/stdout /var/log/nginx/access.log \
   && ln -s /dev/stderr /var/log/nginx/error.log  \
   && rm /etc/nginx/conf.d/default.conf

COPY webserver/react.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
STOPSIGNAL SIGQUIT