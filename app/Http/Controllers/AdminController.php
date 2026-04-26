<?php

namespace App\Http\Controllers;
use App\Models\User\Student;
use App\Models\User\User;

use App\Models\UserRole;
use Illuminate\Http\Request;
use App\Models\User\Admin;

class AdminController extends Controller


{
    /**
     * Display a listing of the resource.
     */
    public function index(){

        return admin::all();

    }

    public function view(){
        $allUsers = User::all();
        return $allUsers;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('AdminRegister');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'f_name' => 'required',
            'l_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'permission_level' => 'required'
        ]);
        $request->merge(['role' => UserRole::ADMIN->value]);
        $user = app(UserController::class)->store($request);
        $validated['id'] = $user->id;
        Admin::create($validated);
        return response()->json(['message' => 'admin created successfully',
            'user' => $user,
            'permission_level' => $validated['permission_level'],
        ], 201);


    }

    /**
     * Display the specified resource.
     */

    // show users ID
    public function show(string $id)
    {
        return User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // edit user data
    public function edit(string $id)
    { // idk we need a page for the admin to edit the user data ?
        $user = User::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'f_name' => 'sometimes|required',
            'l_name' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|required',
            'role' => 'sometimes|required'
        ]);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user = User::find($id);
        $user->update($data);

        return $user;
    }


    /**
     * Remove the specified resource from storage.
     */

    // if admin is wants to kill a user ( bad user )
    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        }
    }

