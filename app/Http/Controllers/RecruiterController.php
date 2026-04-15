<?php

namespace App\Http\Controllers;

use App\Models\User\Recruiter;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Recruiter::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('RecruiterRegister');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'f_name' => 'required',
            'l_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required'
        ]);

        $data['password'] = bcrypt($data['password']);

        // Create the user
        Recruiter::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Recruiter::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $user = app(UserController::class)->update($request, $id);

    }

}
