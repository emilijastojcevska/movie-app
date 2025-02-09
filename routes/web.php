<?php

use Illuminate\Support\Facades\Route;


// Route::get('/', function () {
//     return view('welcome');
// });

 
Route::controller(App\Http\Controllers\MovieController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/get-movies', 'getMovies')->name('getMovies');
    Route::get('/get-movie', 'getMovie')->name('getMovie');


});