<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\RoadmapController;
use Illuminate\Support\Facades\Route;
//
//Route::get('/', function () {
//    return response()->json(['message' => 'Hello from Laravel API! React is connected.']);
//});


//Route::middleware('auth:sanctum')->group(function () {
//    Route::get('/Roadmap',          [RoadmapController::class, 'index']);
////    Route::post('/posts',         [PostController::class, 'store']);
////    Route::get('/posts/{post}',   [PostController::class, 'show']);
////    Route::put('/posts/{post}',   [PostController::class, 'update']);
////    Route::delete('/posts/{post}',[PostController::class, 'destroy']);
//
//});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/company/new', [CompanyController::class, 'store']);
    Route::post('/application/new/{jobposting}', [ApplicationController::class, 'store']);
    Route::get('/profile',[AuthController::class, 'profile']);
    Route::post('/jobposting/new', [JobPostingController::class, 'store']);
    Route::put('/roadmap/{roadmap}', [RoadmapController::class, 'update']);
});
