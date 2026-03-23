<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\Http\Request;
use App\Models\JobPosting\JobPosting;

class JobPostingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $jobpostings = JobPosting::all();
           return view('JobPosting',
               [
                   'jobpostings' => $jobpostings
               ]
           );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('JobPostingForm');//returns job posting form
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $job = $request->validate([
            'date_posted' => 'required', // Must exist, at least 5 chars, max 100
            'job_description' => 'required',       // Must exist and be a number
            'job_name' => 'required',
            'job_requirements' => 'required',
        ]);
        // mention the foreign keys through the relationships in the models
        JobPosting::create($job);
        return view('JobPosting');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return JobPosting::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
