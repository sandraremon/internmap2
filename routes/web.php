<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\RoadmapController;
use Illuminate\Support\Facades\Route;
use App\Models\User\User;
use App\Models\User\Student;
use App\Models\User\Admin;
use App\Models\User\Recruiter;
use App\Models\Roadmap\Roadmap;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;


Route::get('/test-db/users', function () {
    return User::all();
});

Route::get('/test-db/students', function () {
    return Student::all();
});

Route::get('/test-db/admins', function () {
    return Admin::all();
});

Route::get('/test-db/recruiters', function () {
    return Recruiter::all();
});

//Route::get('/', function () {
//    $roadmaps = Roadmap::all();
//    return view('index',[
//                   'roadmaps' => $roadmaps
//               ]);
//})->name('home');

Route::post('/JobPostings/store', [JobPostingController::class, 'store']);

//Route::get('/login', function () {return view('login');});
Route::post('/login', [AuthController::class, 'login']);

Route::get('/signup-choice', function () {
    return view('InternMapSignUpChoice');
});

Route::get('/student/register', [StudentController::class, 'create'])->name('student.register');
Route::post('/student/register', [StudentController::class, 'store'])->name('student.register.submit');

Route::get('/recruiter/register', [RecruiterController::class, 'create']);

Route::post('/recruiter/register', [RecruiterController::class, 'store']);

//Route::get('/company/register', function () {return view('CompanyRegister');});
// routes/api.php
Route::middleware('auth:sanctum')->post('/company/register', [CompanyController::class, 'store']);

Route::get('/recruiter/jobpostings', function () {
    return view('recruiter-jobpostings');
});


Route::get('/admin/register', function () {
    return view('AdminRegister');
});

Route::get('/profile', function () {
    return view('profile');
});

Route::get('/CV', function () {return view('CV');});
Route::post('/CV', [CvController::class, 'store']);

Route::get('/application', function () {

    return view('Application');
});

Route::get('/viewApplicationDetails', function () {
    return view('ViewApplicationDetail');
});



Route::post('/roadmap/create', [RoadmapController::class, 'store']);
Route::post('/application/create', [ApplicationController::class, 'store']);

Route::get('/JobPostingForm', function () {
    return view('JobPostingForm');
});

// Add this to handle the form submission
Route::post('/JobPostingForm', [JobPostingController::class, 'store'])->name('job.store');
//Route::post('/register', [AuthController::class, 'register']);
Route::get('/',          [RoadmapController::class, 'index']);
