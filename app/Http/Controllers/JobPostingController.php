<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\Http\Request;
use App\Models\JobPosting\JobPosting;

class JobPostingController extends Controller
{
    public function index()
    {
        return view('JobPosting');
    }

    public function create()
    {
        return view('JobPostingForm');//returns job posting form
    }

    public function store(Request $request)
    {
        $company = app(CompanyController::class)->store($request);
        $rec = app(RecruiterController::class)->store($request);
        $job = $request->validate([
            'date_posted' => 'required',
            'job_description' => 'required',
            'job_name' => 'required',
            'job_requirements' => 'required',
        ]);
        // mention the foreign keys through the relationships in the models
        $job['company_id'] = $company ->id;
        $job['recruiter_id'] = $rec ->id;
        JobPosting::create($job);
        return view('JobPosting');
    }
    public function show(string $id){ return JobPosting::find($id); }

    //we dont have an edit
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'date_posted' => 'required',
            'job_description' => 'required',
            'job_name' => 'required',
            'job_requirements' => 'required',
        ]);

        $jobPosting = JobPosting::find($id);
        $jobPosting->update($data);

        return $jobPosting;
    }
    public function destroy(string $id)
    {
        $jobPosting = JobPosting::find($id);
        $jobPosting->delete();
    }
}
