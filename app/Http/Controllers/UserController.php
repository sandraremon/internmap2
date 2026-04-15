<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\Http\Request;

/**
 * @method middleware(string $string)
 */
class UserController extends Controller
{
    //this is to restrict the deleting of a user only to the admin
    public function __construct()
    {
        // Only 'admin' role can access the destroy method
        $this->middleware('UserRole:admin')->only('destroy');
    }
    //get all
    public function index()
    {
        return User::all();
    }

    // UserController
    public function store(Request $request)
    {
        $validated = $request->validate([
            'f_name'   => 'required|string|max:255',
            'l_name'   => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $validated['password'] = bcrypt($validated['password']); // never store plain text

        return User::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    //i can use this if i have a update form for user and email
    public function edit(User $user)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'email' => 'sometimes|required',
            'password' => 'sometimes|required',
        ]);
        $validated['password'] = bcrypt($validated['password']);
        $user->update($validated);
        return $user;// should return a confirmation maybe then redirect to home
    }


    //this should be restrictly for the admin     ( I've removed the function for here as we will only use it in admin )
    public function destroy(User $user)
    {
        // return anything , confirmation and homePage
    }
}
