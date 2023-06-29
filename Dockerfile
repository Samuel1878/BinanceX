#React Font End Docker
#stage 1
FROM node:18-alpine as build-step
ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

# Stage 2
RUN rm -rf /usr/share/nginx/html/*

# Stage 3
FROM nginx:alpine
COPY --from=build-step /app/build /usr/share/nginx/html