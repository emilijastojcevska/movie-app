import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js',
                'resources/js/getMovies.js',
                'resources/js/getSingleMovie.js',
                'resources/js/pagination.js'
            ],
            refresh: true,
        }),
    ],
});
