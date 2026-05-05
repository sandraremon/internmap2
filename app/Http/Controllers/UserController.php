<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * @method middleware(string $string)
 */
class UserController extends Controller
{

    //public function __construct(){ }
    public function index(){
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'f_name'   => 'required|string|max:255',
            'l_name'   => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role'     => 'nullable|string',


        ]);

        $validated['password'] = Hash::make($validated['password']); // never store plain text
        if (!$request->has('role')) {
            $validated['role'] = UserRole::STUDENT->value;
        }
        return User::create($validated);
    }
    public function show(string $id)
    {
        return User::find($id);
    }

    //public function edit(User $user){}

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

    public function destroy(User $user)
    {
//        $user->delete();
        // Delete related sessions first
        DB::table('sessions')->where('user_id', $user->id)->delete();

        // Then delete the user (cascades to other relations if set up)
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
    public function userRole(User $user){
        $user=auth()->user();
        $role=$user->role;
        return $role;
}
}
