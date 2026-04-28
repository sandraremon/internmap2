<?php

namespace App\Http\Controllers;

use App\Models\Application\Application;
use App\Models\JobPosting\JobPosting;
use App\Models\UserRole;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
//    public function store(Request $request,JobPosting $job)
//    {
//        $user = auth()->user();
//
//        if ($user->role !== UserRole::STUDENT) {
//            return response()->json([
//                'error' => 'Only students can apply',
//                'your_role' => $user->role
//            ], 403);
//        }
//
//        $student = $user->student;
//
////        $company = $rec->company()->first();
//        $validated = $request->validate([
//            'f_name' => 'required|string',
//            'l_name' => 'required|string',
//            'phone_number' => 'required|string',
//            'email'=>'required|email',
//            'application_date' => 'required|date',
////            'job_id' => 'required|exists:job_posting,id',
//        ]);
//
//        $app = Application::create([
//            ...$validated,
//            'job_id' => $job->id, // ✅ safe access
//            'student_id' => $student->id,
//        ]);
//        return response()->json($app);
//    }
    public function store(Request $request, JobPosting $job)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        if ($user->role !== UserRole::STUDENT) {
            return response()->json([
                'error' => 'Only students can apply',
                'your_role' => $user->role
            ], 403);
        }

        $student = $user->student;

        $validated = $request->validate([
            'f_name' => 'required|string',
            'l_name' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email',
            'application_date' => 'required|date',
            'job_id' => 'required|exists:job_posting,id',
        ]);

        $app = Application::create([
            ...$validated,

            'student_id' => $student->id,
        ]);

        return response()->json($app);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
