<?php

namespace App\Http\Controllers;

use App\Models\CV\cv;
use Illuminate\Http\Request;

class CvController extends Controller
{

//    public function index()
//    {
//        //
//    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $student= $user->student;
        $validated = $request->validate([
                'description'=>'required|string'     ,
                'past_experiences'=>'required|string',
                'projects'=>'required|string'
        ]);
        $validated['student_id'] = $student->id;
        $cv = Cv::updateOrCreate(
            ['student_id' => $student->id],
            $validated
        );
        return response()->json([
            'message' => 'CV created and linked to student successfully',
            'CV' => $cv,
            'belongs to student' => $user
        ], 200);

    }
    public function show(cv $cv)
    {
        return $cv;
    }

    public function edit(Request $request, string $id)
    {
        $user = auth()->user();
        $student = $user->student;

        $validated = $request->validate([
            'description'      => 'required|string',
            'past_experiences' => 'required|string',
            'projects'         => 'required|string',
        ]);

        $cv = Cv::where('student_id', $student->id)->firstOrFail();
        $cv->update($validated);

        return response()->json($cv);
    }

    public function update(Request $request, string $id)
    {

    }

    public function destroy(string $id)
    {

    }
}
