<?php

use App\Http\Controllers\RoadmapController;
use Illuminate\Support\Facades\Route;
//
//Route::get('/', function () {
//    return response()->json(['message' => 'Hello from Laravel API! React is connected.']);
//});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/',          [RoadmapController::class, 'index']);
    Route::post('/posts',         [PostController::class, 'store']);
    Route::get('/posts/{post}',   [PostController::class, 'show']);
    Route::put('/posts/{post}',   [PostController::class, 'update']);
    Route::delete('/posts/{post}',[PostController::class, 'destroy']);
});
