FROM nginx:latest

RUN mkdir /etc/nginx/ssl/

COPY devops/nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html

EXPOSE 80
EXPOSE 443