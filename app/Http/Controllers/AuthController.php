<?php
namespace App\Http\Controllers;
use App\Models\UserRole;
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
    public function profile(Request $request)
    {
        $user = $request->user(); // equivalent to principal.getName() lookup

        if (!$user) {
            return response()->json(['error' => 'there is no user found '], 401);
            // Spring returned "redirect:/" — you handle this redirect in clientLoader
        }

        switch ($user->role) {
            case UserRole::STUDENT:   // ✅ compare enum to enum
                $user->load(['student.Application.jobPosting.company', 'student.cv']);
                break;
            case UserRole::RECRUITER:
                $user->load('company');
                break;
            case UserRole::ADMIN:
                throw new \Exception('To be implemented');
        }
        return response()->json($user);

    }
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
