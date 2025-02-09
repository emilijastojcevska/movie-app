# movie_app



## Movie app
    This is a movie application for searching movies.
    Using the api from "https://developer.themoviedb.org/reference/intro/getting-started"
    In this project is included searching movies and Tv shows and viewing details for the movies in a popup. Added functionality for adding to favorites in local storage on the user browser. 
    Build with laravel 11, Tailwindcss, Javascript, Ajax.

## Commands to run after cloning the project

```
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan storage:link

```

Create database for the project and setup user/password for the database in the .env file.

After that run the following commands:

```

php artisan migrate 

npm run dev

```




