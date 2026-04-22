<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use App\Models\UserRole;
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
//        return view('JobPostingForm');//returns job posting form
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if ($user->role !== UserRole::RECRUITER) {
            return response()->json([
                'error' => 'Only recruiters can post jobs',
                'your_role' => $user->role
            ], 403);
        }
        $rec = $user->recruiter;
        //picking the first one of that specific recruiter , technically the last
        $company = $rec->company()->first();
        if (!$company) {
            return response()->json(['error' => 'No company assigned to this recruiter'], 404);
        }
        $job = $request->validate([
            'date_posted' => 'required',
            'job_description' => 'required',
            'job_name' => 'required',
            'job_requirements' => 'required',
        ]);

        $job['company_id'] = $company->id;
        $job['recruiter_id'] = $rec->id;
        JobPosting::create($job);
        return response()->json($job, 200);
    }
    public function show(string $id)
    {
        return JobPosting::find($id);
    }

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
