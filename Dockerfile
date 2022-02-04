# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-alpine3.12 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG API_HOST=http://host.docker.internal:3000
ARG DOLLAR=$
RUN apk --no-cache add gettext
ENV API_HOST=${API_HOST}
ENV DOLLAR=${DOLLAR}
RUN envsubst < /app/nginx.tmpl > /app/nginx.conf
RUN cat /app/nginx.conf | tee /my-install-cmd.log
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /my-install-cmd.log /my-install-cmd.log
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
