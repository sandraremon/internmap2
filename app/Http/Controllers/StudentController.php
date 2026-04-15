<?php

namespace App\Http\Controllers;

use App\Models\User\Student;
use Illuminate\Http\Request;
use App\Models\User\User;

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

    //the request is the newly registered student
    //gives me the data that the student just submitted
    public function store(Request $request)
    {
        $validated = $request->validate([
            'f_name' => 'required|string',
            'l_name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'uni_name' => 'required|string',
            'student_major' => 'required|string',
            'faculty' => 'required|string',
            'graduating_year' => 'required|integer',
        ]);

        // Create User
        $user = User::create([
            'f_name' => $validated['f_name'],
            'l_name' => $validated['l_name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'STUDENT',
        ]);

        // Create Student record
        Student::create([
            'id' => $user->id,
            'uni_name' => $validated['uni_name'],
            'student_major' => $validated['student_major'],
            'faculty' => $validated['faculty'],
            'graduating_year' => $validated['graduating_year'],
        ]);

        auth()->login($user);

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
