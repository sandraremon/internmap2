<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User\Recruiter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        \Log::info('Request data:', $request->all());
        \Log::info('Recruiter relation:', ['recruiter' => $user->recruiter]);

        $validated = $request->validate([
            'f_name' => 'sometimes|string',
            'l_name' => 'sometimes|string',
            'email' => 'sometimes|email',
            'student_major' => 'sometimes|string',
            'graduating_year' => 'sometimes|string',
            'uni_name' => 'sometimes|string',
            'faculty' => 'sometimes|string',
            'title' => 'sometimes|string',
        ]);

        $user->f_name = $validated['f_name'] ?? $user->f_name;
        $user->l_name = $validated['l_name'] ?? $user->l_name;
        $user->email = $validated['email'] ?? $user->email;
        $user->save();

        \Log::info('User after save:', $user->fresh()->toArray());

        if ( $user->student) {
            $student = $user->student;
            $student->student_major = $validated['student_major'] ?? $student->student_major;
            $student->graduating_year = $validated['graduating_year'] ?? $student->graduating_year;
            $student->uni_name = $validated['uni_name'] ?? $student->uni_name;
            $student->faculty = $validated['faculty'] ?? $student->faculty;
            $student->save();
        }

        if ($user->recruiter) {
            $recruiter = $user->recruiter;
            $recruiter->title = $validated['title'] ?? $recruiter->title;
            $recruiter->save();

        }

        return response()->json($user->fresh(['student', 'recruiter']));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
