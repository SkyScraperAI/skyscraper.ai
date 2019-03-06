FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV NODE_ENV=production
RUN yarn run build

FROM linuxserver:letsencrypt

COPY default.conf /config/nginx/site-confs/default
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
