<?php

namespace App\Http\Controllers;

use App\Models\JobPosting\JobPosting;
use App\Models\JobPosting\JobPostingType;
use App\Models\User\User;
use App\Models\UserRole;
use Illuminate\Http\Request;


class JobPostingController extends Controller
{
    public function index()
    {
        return response()->json(JobPosting::all());
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
        //review this
        $company = $rec->company()->first();

//        if (!$company) {
//            return response()->json([
//                'error' => 'No company assigned to this recruiter'
//            ], 404);
//        }

        // ✅ full validation
        $validated = $request->validate([
            'date_posted' => 'required|date',
            'job_description' => 'required|string',
            'job_name' => 'required|string',
            'job_requirements' => 'required|string',
            'type' => 'required|in:Internship,FreelanceProject,FullTime',
            // 👇 ADD THIS
            'benefits' => 'nullable|string',
            'duration'=> 'nullable|string',
            'job_location'=>'nullable|string',
            'payout'=>'nullable|string'

        ]);

//        // ✅ merge extra fields
//        $validated['nullable|exists:company_id'] = $company->id;
//        $validated['recruiter_id'] = $rec->id;
        $job = JobPosting::create([
            ...$validated,
            'company_id' => $company?->id, // ✅ safe access
//            'company_id' => $company->id,
            'recruiter_id' => $rec->id,
        ]);

//        // ✅ now $job is a MODEL
//        $job = JobPosting::create($validated);

        // ✅ correct logic
        switch ($validated['type']) {

            case 'Internship':
                $job->internship()->create([
                    'duration' => $validated['duration'],
                    'job_location' => $validated['job_location'],
                ]);
                break;

            case 'FreelanceProject':
                $job->freelanceProject()->create([
                    'duration' => $validated['duration'],
                    'payout' => $validated['payout'],
                    'job_location' => $validated['job_location'],
                ]);
                break;

            case 'FullTime':
                $job->fullTime()->create([
                    'benefits' => $validated['benefits'],
                ]);
                break;
        }

//        return response()->json(
//            $job->load(['Internship', 'FreelanceProject', 'FullTime']),
//            201
//        );
        $details = match ($job->type) {
            JobPostingType::Internship => $job->internship,
            JobPostingType::FreeLanceProject => $job->freelanceProject,
            JobPostingType::FullTime => $job->fullTime,
        };

        return response()->json([
            'id' => $job->id,
            'date_posted' => $job->date_posted,
            'job_name' => $job->job_name,
            'type' => $job->type,
            'details' => $details,
        ], 201);
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
