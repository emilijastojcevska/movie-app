<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,500&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />

        <style>
            [x-cloak] {
                display: none;
            }
        </style>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

    
    </head>
    <body >


 

    

        {{ $slot }}

        <div id="loader" class="fixed top-0 bg-gray-600 bg-opacity-75 h-full w-full  loader" style="display: none"> 
        <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2  loader">
            <div class="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
                <div class="bg-gray-600  bg-opacity-50 rounded-full">
                    <div class="w-24 h-24 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
        @stack('modals')

      
       



        @stack('scripts')
    </body>
</html>
