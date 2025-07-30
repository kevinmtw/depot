# ./Dockerfile (for Laravel PHP backend)
FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git zip unzip curl libzip-dev libpng-dev libonig-dev libxml2-dev \
    dumb-init netcat-openbsd \
    && docker-php-ext-install pdo_mysql mbstring zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install
RUN chmod +x ./bootstrap.sh

ENTRYPOINT ["dumb-init", "--"]
CMD ["./bootstrap.sh"]
