FROM nginx:latest

ARG SSL_CERT
ARG SSL_KEY

RUN mkdir /etc/nginx/certs/
RUN echo "$SSL_CERT" > /etc/nginx/certs/siadev.crt
RUN echo "$SSL_KEY" > /etc/nginx/certs/siadev.key

COPY /devops/nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html

EXPOSE 80
EXPOSE 443