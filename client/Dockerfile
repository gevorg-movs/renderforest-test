FROM node:latest

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

WORKDIR /home/app/

COPY . /home/app/

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]