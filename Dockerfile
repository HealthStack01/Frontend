FROM node:16 as build

ENV NODE_ENV=development
ENV NODE_OPTIONS=--max_old_space_size=1024

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY  --chown=node:node . .

RUN npm i react-scripts -g

USER root

RUN rm -Rf **/node_modules && rm -Rf node_modules 

RUN npm install -g --silent --no-audit --no-fund --no-package-lock

RUN npm i -g react-scripts

RUN chmod +x entrypoint.sh

RUN chown -R node:node /home/node/app

ENTRYPOINT [ "./entrypoint.sh" ]

ENV PORT=3000
EXPOSE 3000
