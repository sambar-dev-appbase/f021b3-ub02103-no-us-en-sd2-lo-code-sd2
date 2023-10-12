FROM 635602896676.dkr.ecr.eu-west-2.amazonaws.com/nginx-base:angular.2021.02.1

COPY v1/angular/dist/ /usr/share/nginx/html
COPY v1/angular/dependencies /usr/share/nginx/html/dependencies
