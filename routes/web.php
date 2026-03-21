<?php

use Illuminate\Support\Facades\Route;
use App\Models\User\User;
use App\Models\User\Student;
use App\Models\User\Admin;
use App\Models\User\Recruiter;
use App\Models\JobPosting\JobPosting;

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
    $job = \App\Models\JobPosting\JobPosting::create([
        'id'=>1033,
        'job_description' => 'project',
        'job_name' => 'project',
        'job_requirements' => 'jojas',
        'company_id' => 32,      // must exist
        'recruiter_id' => 23  ,
        'date_posted' => now()// must exist
    ]);
    $job->freelanceProject()->create([
        'duration' => 12.4,
        'payout' => 9400,
        'job_location' => 'cairo'
    ]);

    return JobPosting::all();
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


