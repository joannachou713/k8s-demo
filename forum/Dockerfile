FROM node:14-alpine
WORKDIR /forum
COPY package.json .
RUN yarn install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["yarn", "start"]
