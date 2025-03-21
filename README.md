# Desafio-FullStack
Projeto de Cadastro de Desenvolvedores
# Cadastro de Desenvolvedores

Este projeto é uma aplicação web para cadastro de desenvolvedores associados a diferentes níveis. O backend foi desenvolvido utilizando Laravel, o frontend foi desenvolvido em React e a aplicação utiliza Docker para orquestrar os containers do backend e frontend.

## Tecnologias Utilizadas

- **Backend**: Laravel
- **Frontend**: React
- **Banco de Dados**: MySQL
- **Orquestração de Containers**: Docker e Docker Compose


### Detalhes do Dockerfile

#### Backend (Laravel)

O Dockerfile do backend configura o container para executar o Laravel com PHP e Nginx.

```Dockerfile
FROM php:8.0-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev git unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Definir o diretório de trabalho
WORKDIR /var/www

# Copiar arquivos do projeto para o container
COPY . .

# Instalar as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# Instalar dependências do Laravel
RUN composer install

# Definir as permissões
RUN chown -R www-data:www-data /var/www

# Expor a porta do backend
EXPOSE 8000


# Utiliza a imagem oficial do Node.js
FROM node:16-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar as dependências do React
RUN npm install

# Compilar o projeto
RUN npm run build

# Expor a porta do frontend
EXPOSE 3000

# Comando para iniciar o servidor React
CMD ["npm", "start"]


## Seeder de Usuário Administrador

O projeto inclui um **Seeder** para criar um usuário administrador padrão no banco de dados. Para ativá-lo, siga os passos abaixo:

1. **Verifique o arquivo `UserSeeder.php`**  
   O arquivo `database/seeders/UserSeeder.php` já está pronto para criar um usuário com as seguintes credenciais:

   - **E-mail**: `adm@email.com`
   - **Senha**: `senha123`

2. **Descomente o Seeder no `DatabaseSeeder.php`**  
   No arquivo `database/seeders/DatabaseSeeder.php`, descomente a linha referente ao `UserSeeder` para que ele seja executado:

   ```php
   public function run()
   {
       $this->call([
           UserSeeder::class, // Descomente esta linha se estiver comentada
       ]);
   }

