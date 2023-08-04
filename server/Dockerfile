FROM node:16

WORKDIR /app

# COPY package*.json ./
COPY . .

RUN yarn install
RUN yarn generate

ENV PORT=4000

CMD ["yarn", "start"]

EXPOSE 4000
