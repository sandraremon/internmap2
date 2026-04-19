<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Roadmap\Roadmap;

class RoadmapController extends Controller
{
    public function index()
    {
        $roadmaps = Roadmap::all();
        return view('roadmap.view', ['roadmaps' => $roadmaps]);
        // this returns all roadmaps
    }

    public function create()
    {
        return view('roadmap.form');
        //this returns the HTML form to make a roadmap
    }

    public function store(Request $request)
    {
        $roadmap = $request->validate([
                'name' => 'required'
        ]);

        Roadmap::create($roadmap);
        return redirect("/");
        //this fetches the data and saves it in database
    }

    public function show(string $id)
    {
        return Roadmap::find($id);
    }

    public function edit(string $id)
    {
        $roadmap = Roadmap::find($id);
        return view('roadmap.form', ['roadmap' => $roadmap]);
        // idk what to put in here
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        $roadmap = Roadmap::find($id);
        $roadmap->update($data);
         return view('roadmap.view', ['roadmap' => $roadmap]);
    }

    public function destroy(string $id)
    {
        Roadmap::destroy($id);
        return view('index');
    }
}
