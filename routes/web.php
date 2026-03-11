<?php

use Illuminate\Support\Facades\Route;

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


