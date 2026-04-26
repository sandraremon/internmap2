<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Models\User\User;
use App\Models\User\Student;
use App\Models\User\Admin;
use App\Models\User\Recruiter;
use App\Models\Roadmap\Roadmap;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;

//login
Route::post('/login', [AuthController::class, 'login']);//done with front
//jobPosting
Route::post('/api/jobposting/new', [JobPostingController::class, 'store']);
Route::get('/api/jobposting/', [JobPostingController::class, 'index']);

//this is for creating users
Route::post('/api/student/register', [StudentController::class, 'store']);
Route::post('/api/admin/register', [AdminController::class, 'store']);
Route::post('/api/recruiter/register', [RecruiterController::class, 'store']);
Route::get('/api/student/', [StudentController::class, 'index']);
Route::get('/api/users/', [UserController::class, 'index']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);
Route::delete('/roadmap/{roadmap}', [RoadmapController::class, 'destroy']);
Route::get('/api/recruiter/', [RecruiterController::class, 'index']);

//company
Route::post('/api/company/new', [CompanyController::class, 'store']);
//roadmap
Route::post('/api/roadmap/new', [RoadmapController::class, 'store']);//done with front
Route::get('/api/roadmap/', [RoadmapController::class, 'index']);//done with front
//application
Route::post('/api/application/new', [ApplicationController::class, 'store']);

//Route::get('/company/register', function () {return view('CompanyRegister');});
// routes/api.php
//Route::middleware('auth:sanctum')->post('/company/register', [CompanyController::class, 'store']);






Route::get('/profile', function () {
    return view('profile');
});

Route::middleware('auth:sanctum')->post('/cv/create', [CvController::class,'store']);


Route::get('/application', function () {

    return view('Application');
});

Route::get('/viewApplicationDetails', function () {
    return view('ViewApplicationDetail');
});



Route::get('/JobPostingForm', function () {
    return view('JobPostingForm');
});

// Add this to handle the form submission
//Route::post('/JobPostingForm', [JobPostingController::class, 'store'])->name('job.store');

Route::get('/',          [RoadmapController::class, 'index']);
