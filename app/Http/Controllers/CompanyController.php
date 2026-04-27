<?php

namespace App\Http\Controllers;

use App\Models\Company\Company;
use App\Models\JobPosting\JobPosting;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        return Company::all();
    }


//    public function store(Request $request)
//    {
//        $user = auth()->user();
//        $recruiter = $user->recruiter;
//        if(!$recruiter){
//            return response()->json(['error' => 'Recruiter was not found'], 403);
//        }
//        $validated = $request->validate([
//            'industry' => 'required|string',
//            'location_ofhq' => 'required|string',
//            'name' => 'required|string',
//            'websiteurl' => 'required|string|url'
//        ]);
////
////        $company=Company::create($validated);
//        $company = Company::create([
//            ...$validated,
//            'recruiter_id' => $recruiter->id,
//        ]);
//        if (!$company->id) {
//            return response()->json(['error' => 'Database failed to save company record.'], 500);
//        }
////        $recruiter->company()->attach($company->id);
//        return response()->json([
//            'message' => 'Company created and linked successfully',
//            'company' => $company
//        ], 200);
//    }
    public function store(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $recruiter = $user->recruiter;

        if (!$recruiter) {
            return response()->json([
                'error' => 'Recruiter profile not found for this user',
                'user_id' => $user->id  // remove this after debugging
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'industry' => 'required|string',
            'location_ofhq' => 'required|string',
            'websiteurl' => 'required|string',
        ]);
//        $job = JobPosting::create([
//            ...$validated,
//            'company_id' => $company?->id, // ✅ safe access
////            'company_id' => $company->id,
//            'recruiter_id' => $rec->id,
//        ]);
        // 1. Create company
        $company =
            Company::create(
                $validated,
            );

        // 2. Attach recruiter (pivot table)
        $recruiter->company()->attach($company->id);

        return response()->json($company);
    }

    public function show(string $id){ return Company::find($id); }

   // public function edit(string $id){}
    //public function update(Request $request, string $id){ }
    //public function destroy(string $id){}
}
