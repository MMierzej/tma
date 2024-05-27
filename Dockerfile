FROM node:20 as builder

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

WORKDIR /home/nobody/app

COPY --chown=nobody:nobody package*.json tsconfig.json ./
COPY --chown=nobody:nobody src src

RUN npm install-clean
RUN npx tsc --outDir dist


FROM node:20-alpine

RUN apk add --update shadow

WORKDIR /home/nobody/app

RUN usermod -d /home/nobody nobody \
    && chown -R nobody:nobody /home/nobody
USER nobody

COPY --chown=nobody:nobody package*.json ./
COPY --chown=nobody:nobody public public
COPY --from=builder --chown=nobody:nobody /home/nobody/app/dist dist

ENV NODE_ENV=production

RUN npm install-clean

CMD ["node", "dist/server.js"]
