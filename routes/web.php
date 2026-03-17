<?php

use Illuminate\Support\Facades\Route;
use App\Models\User\User;
use App\Models\User\Student;
use App\Models\User\Admin;
use App\Models\User\Recruiter;

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

Route::get('/', function () {
    return view('index');
});

Route::get('/JobPostings', function () {
    return view('JobPosting');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/signup-choice', function () {
    return view('InternMapSignUpChoice');
});

Route::get('/student/register', function () {
    return view('StudentRegister');
});

Route::get('/recruiter/register', function () {
    return view('RecruiterRegister');
});

Route::get('/admin/register', function () {
    return view('AdminRegister');
});

Route::get('/profile', function () {
    return view('profile');
});

Route::get('/CV', function () {
    return view('CV');
});

Route::get('/application', function () {
    return view('Application');
});

Route::get('/viewApplicationDetails', function () {
    return view('ViewApplicationDetail');
});

Route::get('/JobPostingForm', function () {
    return view('JobPostingForm');
});


