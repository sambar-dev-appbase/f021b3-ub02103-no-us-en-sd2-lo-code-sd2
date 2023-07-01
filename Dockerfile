#FROM 623532641099.dkr.ecr.us-west-2.amazonaws.com/php-base:apache2.2020.01.4

#COPY angular/dist/ /app/
#COPY angular/dependencies /app/dependencies
#COPY apache2.conf /etc/apache2/
#COPY .htaccess /app/

FROM 635602896676.dkr.ecr.eu-west-2.amazonaws.com/nginx-base:angular.2021.02.1

COPY v1/angular/dist/ /usr/share/nginx/html
COPY v1/angular/dependencies /usr/share/nginx/html/dependencies

RUN mkdir /usr/sambar
WORKDIR /usr