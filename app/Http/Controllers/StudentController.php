<?php

namespace App\Http\Controllers;

use App\Models\User\Student;
use App\Models\UserRole;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public function index()
    {
        return Student::all();
    }

    // takes you to the register form
    //then save the student who registered in the store()
    public function create()
    {
        return view('StudentRegister');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'uni_name'        => 'required|string',
            'student_major'   => 'required|string',
            'faculty'         => 'required|string',
            'graduating_year' => 'required|integer',
        ]);
        $request->merge(['role' => UserRole::STUDENT->value]);
        $user = app(UserController::class)->store($request);
        $validated['id'] = $user->id;
        Student::create($validated);
        return redirect("/");
    }

    //send the user of that id - we can also make it an email
    //maybe for the search bar ?
    public function show(string $id)
    {
        $student = Student::findOrFail($id);
        return $student;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    //update credentials
    public function update(Request $request, string $id)
    {
        $user = app(UserController::class)->update($request, $id);
    }

}
