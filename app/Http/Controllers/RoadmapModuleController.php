<?php

namespace App\Http\Controllers;

use App\Models\Roadmap\Roadmap;
use App\Models\Roadmap\RoadmapModule;
use App\Models\UserRole;
use Illuminate\Http\Request;

class RoadmapModuleController extends Controller
{
    public function index(){
        return response()->json(RoadmapModule::all());
    }

    public function view(){

    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request, Roadmap $roadmap)
    {
        $user = auth()->user();

        // Usually admins are allowed, so adjust this if needed
        if ($user->role !== UserRole::ADMIN->value) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // ✅ create module (THIS is where create belongs)
        $module = RoadmapModule::create($validated);

        // ✅ attach to roadmap (pivot table)
        $roadmap->modules()->attach($module->roadmap_module_id);

        return response()->json([
            'message' => 'Module created successfully',
            'data' => $module
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    // show users ID
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    // edit user data
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }


    /**
     * Remove the specified resource from storage.
     */

    // if admin is wants to kill a user ( bad user )
    public function destroy(string $id)
    {

    }

}
