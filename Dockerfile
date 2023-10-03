FROM node:18.17.1-buster-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM ghcr.io/nginxinc/nginx-unprivileged:1.25.2-alpine-slim AS final
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=101:101 /app/build/ .