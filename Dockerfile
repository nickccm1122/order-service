FROM mhart/alpine-node:8 AS build
WORKDIR /srv/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

FROM mhart/alpine-node:8 AS run
WORKDIR /srv/app
COPY --from=build /srv/app ./
COPY . .
ENTRYPOINT [ "node", "src/index.js" ]
