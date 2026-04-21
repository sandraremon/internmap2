<?php

namespace App\Http\Controllers;

use App\Models\Roadmap\RoadmapModule;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Skill::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,RoadmapModule $module)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description'=>'required|string|max:255',
        ]);
        $skill = Skill::create($validated);
        $module->skills()->attach($skill->skill_id);
        return response()->json($skill, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Skill $skill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        //
    }
}
