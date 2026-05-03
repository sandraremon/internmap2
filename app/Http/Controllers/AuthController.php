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
////        $user = $request->user();
//         $user = Auth::user();
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'No user found'], 401);
        }

        switch ($user->role) {
//            case UserRole::STUDENT:
//                if ($user->student) {
//                    $user->load('student');
//
//                    if ($user->student->relationLoaded('applications')) {
//                        $user->load('student.applications');
//                    }
//
//                    $user->load([
//                        'student.cv',
//                        'student.applications.jobPosting.company'
//                    ]);
//                }
//            case UserRole::STUDENT:   // ✅ compare enum to enum
//                $$user->load(['student.applications.jobPosting.company', 'student.cv']);
//                break;
            case UserRole::STUDENT:
                if ($user->student) {
                    $user->load([
                        'student.cv',
                        'student.applications.jobPosting.company'
                    ]);
                }
                break;

            case UserRole::RECRUITER:
                if ($user->recruiter) {
                    $user->load('recruiter.company');
                }
                break;

            case UserRole::ADMIN:
                // Admin-specific data loading if needed
                break;
        }

        return response()->json($user);
    }
//    public function profile(Request $request)
//    {
//        $user = Auth::user();
//
//        if (!$user) {
//            return response()->json(['error' => 'No user found'], 401);
//        }
//
//        return response()->json($user);
//    }
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
