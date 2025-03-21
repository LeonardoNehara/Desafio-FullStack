# Usa a imagem oficial do PHP com Apache
FROM php:8.3-apache

# Instala extensões necessárias para o Laravel
RUN apt-get update && apt-get install -y \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mbstring zip pdo pdo_mysql

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia o arquivo de configuração customizado para o Apache
COPY ./docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Copia os arquivos do projeto para dentro do container
WORKDIR /var/www/html
COPY . .

# Permissões para o storage e bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Ativa o mod_rewrite para o Laravel funcionar corretamente
RUN a2enmod rewrite

# Expõe a porta 80 para acessar via navegador
EXPOSE 80

CMD ["apache2-foreground"]