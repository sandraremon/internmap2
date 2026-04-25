<?php

namespace App\Http\Controllers;

use App\Models\Company\Company;
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

    public function store(Request $request)
    {
        $user = auth()->user();
        $recruiter = $user->recruiter;
        if(!$recruiter){
            return response()->json(['error' => 'Recruiter was not found'], 403);
        }
        $validated = $request->validate([
            'industry' => 'required|string',
            'location_ofhq' => 'required|string',
            'name' => 'required|string',
            'websiteurl' => 'required|string|url'
        ]);

        $company=Company::create($validated);

        if (!$company->id) {
            return response()->json(['error' => 'Database failed to save company record.'], 500);
        }
        $recruiter->company()->attach($company->id);
        return response()->json([
            'message' => 'Company created and linked successfully',
            'company' => $company
        ], 200);
    }

    public function show(string $id){ return Company::find($id); }

   // public function edit(string $id){}
    //public function update(Request $request, string $id){ }
    //public function destroy(string $id){}
}
