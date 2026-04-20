<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{

    public function login(Request $request)
    {
        // 1. Validate the input
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Attempt to authenticate
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // 3. Create a Plain Text Token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Logged in successfully',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ], 200);
        }

        // 4. Handle failure
        return response()->json([
            'message' => 'Invalid login details'
        ], 401);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
