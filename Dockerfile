FROM node:16 as build

ENV NODE_ENV=development

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY  --chown=node:node . .

USER root

RUN rm -Rf **/node_modules && rm -Rf node_modules 

RUN npm install -g --silent --no-audit --no-fund --no-package-lock

RUN chmod +x entrypoint.sh

RUN chown -R node:node /home/node/app

ENTRYPOINT [ "./entrypoint.sh" ]

ENV PORT=8080
EXPOSE 8080
