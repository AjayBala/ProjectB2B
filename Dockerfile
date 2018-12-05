
FROM node:alpine

LABEL ostk.app.name b2bprofessional

RUN mkdir /dist

WORKDIR /dist

COPY . .

ENV PATH /dist/node_modules/.bin:$PATH

ADD package.json /dist/package.json

RUN npm install

RUN npm audit fix

RUN npm run build

#RUN ls -lsa

#EXPOSE 8080
