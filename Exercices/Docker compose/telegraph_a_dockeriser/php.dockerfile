FROM php:apache-bullseye

RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql

COPY ./serveur_php/html /var/www/html