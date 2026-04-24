<?php

namespace App\Http\Controllers;

use App\Models\User\Recruiter;
use App\Models\UserRole;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    public function index()
    {
        return Recruiter::all();
    }
    public function create()
    {
        return view('RecruiterRegister');
    }
    public function store(Request $request)
    {
        $recData = $request->validate([
            'title' => 'required|string',
        ]);
        $request->merge(['role' => UserRole::RECRUITER->value]);
        $user = app(UserController::class)->store($request);
        $recData['id'] = $user->id;
        Recruiter::create($recData);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'title' => $recData['title'],
            'token' => $token,
        ], 200);
    }
    public function show(string $id)
    {
        return Recruiter::find($id);
    }
    public function edit(string $id, $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
        ]);
        $request->merge(['role' => UserRole::RECRUITER->value]);
        $user = app(UserController::class)->store($request);
        $validated['id'] = $user->id;
        Recruiter::create($validated);
        return redirect("/");
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required',
        ]);

        $rec = Recruiter::find($id);
        $rec->update($data);

        return $rec;
    }
}
