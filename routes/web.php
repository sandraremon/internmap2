<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\ProfileController;
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
//done
//login,homepage,dashboard,roadmap form,logout
//todo:creating users,jobposting,company,application,viewing applications

//login
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);//done with front

Route::get('/api/jobposting/', [JobPostingController::class, 'index']);

//this is for creating users
Route::post('/api/student/register', [StudentController::class, 'store']);
Route::post('/api/admin/register', [AdminController::class, 'store']);
Route::post('/api/recruiter/register', [RecruiterController::class, 'store']);
Route::get('/api/student/', [StudentController::class, 'index']);
Route::get('/api/users/', [UserController::class, 'index']);
Route::delete('/api/users/{user}', [UserController::class, 'destroy']);
Route::delete('/api/roadmap/{roadmap}', [RoadmapController::class, 'destroy']);
Route::get('/api/recruiter/', [RecruiterController::class, 'index']);
Route::get('/api/roadmap/{roadmap}', [RoadmapController::class, 'show']);
//Route::middleware('auth:sanctum')->post('/api/jobposting/new', [JobPostingController::class, 'store']);


//roadmaps
Route::get('/api/roadmap/{roadmap}', [RoadmapController::class, 'show']);
//company
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/company/new', [CompanyController::class, 'store']);
});
//roadmap
Route::post('/api/roadmap/new', [RoadmapController::class, 'store']);//done with front
Route::get('/api/roadmap/', [RoadmapController::class, 'index']);//done with front
//application
Route::post('/api/application/new/{jobposting}', [ApplicationController::class, 'store']);
//profile
Route::middleware('auth:sanctum')->get('/api/user/role',[UserController::class, 'userRole']);
//cv
Route::middleware('auth:sanctum')->post('/cv/create', [CvController::class,'store']);
Route::middleware('auth:sanctum')->get('/api/profile', [AuthController::class,  'profile']);
Route::middleware('auth:sanctum')->post('/application/new/{jobposting}', [ApplicationController::class, 'store']);
Route::middleware('auth:sanctum')->get('api/myJobPostings', [JobPostingController::class, 'myJobPostings']);
Route::get('/api/job/{id}/applicants', [ApplicationController::class, 'getJobApplicants']);
Route::patch('/api/application/{id}/status', [ApplicationController::class, 'updateApplicationStatus']);
Route::middleware('auth:sanctum')->patch('/api/profile/update', [ProfileController::class, 'updateProfile']);
// Add this to handle the form submission
//Route::post('/JobPostingForm', [JobPostingController::class, 'store'])->name('job.store');
//Route::get('/',          [RoadmapController::class, 'index']);
