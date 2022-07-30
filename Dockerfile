# build stage
FROM node:lts-alpine as build-stage

ARG VITE_ACCOUNTS_API_URL
ARG VITE_PAYMENTS_API_URL
ARG VITE_ACCOUNTS_DASH_URL
ARG VITE_PAYMENTS_DASH_URL
ARG VITE_NOTIFY_DASH_URL

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN ["yarn", "install"]

COPY . .

RUN ["yarn", "run", "build"]



# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY ["docker/nginx/nginx.conf", "/etc/nginx/nginx.conf"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]