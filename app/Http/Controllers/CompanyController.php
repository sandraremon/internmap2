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
    public function create()
    {
        return view('CompanyRegister');
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
        $recruiter = $user->recruiter;

        if (!$recruiter) {
            return response()->json(['error' => 'Recruiter not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'industry' => 'required|string',
            'location_ofhq' => 'required|string',
            'websiteurl' => 'required|string',
        ]);

        // 1. Create company
        $company = Company::create($validated);

        // 2. Attach recruiter (pivot table)
        $recruiter->company()->attach($company->id);

        return response()->json($company);
    }

    public function show(string $id){ return Company::find($id); }

   // public function edit(string $id){}
    //public function update(Request $request, string $id){ }
    //public function destroy(string $id){}
}
