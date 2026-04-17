<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'message' => 'Logged in successfully',
                'user' => $user
            ], 200);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
