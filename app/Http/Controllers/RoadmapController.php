<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;
use App\Models\Roadmap\Roadmap;

class RoadmapController extends Controller
{
    public function index()
    {
        return response()->json(Roadmap::all());
        // this returns all roadmaps
    }

//    public function create()
//    {
//        return view('roadmap.form');
//        //this returns the HTML form to make a roadmap
//    }

    public function store(Request $request)
    {
        $user = auth()->user();

        if ($user->role !== UserRole::ADMIN->value) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $roadmap = Roadmap::create($validated);

        return response()->json($roadmap, 201);
    }

    public function show(Roadmap $roadmap)
    {
        return response()->json($roadmap);
    }

//    public function edit(string $id)
//    {
//        $roadmap = Roadmap::find($id);
//        return view('roadmap.form', ['roadmap' => $roadmap]);
//        // idk what to put in here
//    }

    public function update(Request $request, Roadmap $roadmap)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        $roadmap->update($data);
        return response()->json($roadmap);
//         return view('roadmap.view', ['roadmap' => $roadmap]);
    }

    public function destroy(Roadmap $roadmap)
    {
        $roadmap->delete();
        return response()->json(null, 204);
    }
}
