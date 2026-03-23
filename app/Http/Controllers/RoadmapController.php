<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Roadmap\Roadmap;

class RoadmapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roadmaps = Roadmap::all();
        return view('roadmap.view', ['roadmaps' => $roadmaps]);
        // this returns all roadmaps
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('roadmap.form');
        //this returns the HTML form to make a roadmap
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $roadmap = $request->validate([
                'name' => 'required'
        ]);

        Roadmap::create($roadmap);
        return view('roadmap.form');
        //this fetches the data and saves it in database
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Roadmap::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // idk what to put in here
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        $roadmap = Roadmap::find($id);
        $roadmap->update($data);
        return view('roadmap.form');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Roadmap::destroy($id);
        return view('index');
    }
}
