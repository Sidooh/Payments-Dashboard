# build stage
FROM node:lts-alpine as build-stage

ARG VITE_LOG_LEVEL
ARG VITE_ACCOUNTS_API_URL
ARG VITE_PAYMENTS_API_URL
ARG VITE_ACCOUNTS_DASHBOARD_URL
ARG VITE_PAYMENTS_DASHBOARD_URL
ARG VITE_NOTIFY_DASHBOARD_URL
ARG VITE_USSD_DASHBOARD_URL
ARG VITE_SAVINGS_DASHBOARD_URL

WORKDIR /app

RUN ["yarn", "set", "version", "berry"]
RUN ["yarn", "plugin", "import", "typescript"]

COPY ["package.json", "yarn.lock", "./"]
COPY [".yarnrc.yml", "."]

RUN ["yarn", "install"]

COPY . .

RUN ["yarn", "run", "build"]



# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY ["docker/nginx/nginx.conf", "/etc/nginx/nginx.conf"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]