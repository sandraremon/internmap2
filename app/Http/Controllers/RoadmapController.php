<?php

namespace App\Http\Controllers;

use App\Models\Roadmap\RoadmapModule;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Http\Request;
use App\Models\Roadmap\Roadmap;
use Illuminate\Support\Facades\DB;
use Throwable;

class RoadmapController extends Controller
{
    public function index()
    {
        $roadmaps = Roadmap::with('modules.skills.skill_resource_links')->get();

        return response()->json($roadmaps);
    }

    /**
     * @throws Throwable
     */
    public function store(Request $request)
    {
//        $user = auth()->user();
//        if ($user->role !== UserRole::ADMIN->value) {
//            abort(403, 'Unauthorized');
//        }
        $validated = $request->validate([
            'name'                              => 'required|string|max:255',

            // modules is an array, and each item inside must have name + description
            'modules'                           => 'required|array|min:1',
            'modules.*.name'                    => 'required|string|max:255',
            'modules.*.description'             => 'required|string',

            // skills is an array inside each module
            'modules.*.skills'                  => 'required|array|min:1',
            'modules.*.skills.*.name'           => 'required|string|max:255',
            'modules.*.skills.*.description'    => 'required|string|max:255',
            'modules.*.skills.*.links'   => 'nullable|array',
            'modules.*.skills.*.links.*' => 'nullable|url'
        ]);

        // wrap in a transaction
        // If anything fails, ALL of it gets rolled back — no broken data in DB
        $roadmap = DB::transaction(function () use ($validated) {
            //create roadmap
            $roadmap = Roadmap::create([
                'name'        => $validated['name'],
            ]);
            //loop over each module to create it
            foreach ($validated['modules'] as $moduleData) {

                //create the module
                $module = RoadmapModule::create([
                    'name'        => $moduleData['name'],
                    'description' => $moduleData['description'],
                ]);

                //attach module to roadmap (writes to pivot table)
                $roadmap->modules()->attach($module->id);

                //loop over each skill inside this module
                foreach ($moduleData['skills'] as $skillData) {

                    //create the skill
                    $skill = Skill::create([
                        'name'        => $skillData['name'],
                        'description' => $skillData['description'],
                    ]);

                    //attach skill to module (writes to pivot table)
                    $module->skills()->attach($skill->id);

                    foreach ($skillData['links'] ?? [] as $link) {
                        if ($link) {
                            DB::table('skill_resource_links')->insert([
                                'skill_id'       => $skill->id,
                                'resource_links' => $link,
                            ]);
                        }
                    }
                }
            }
            return $roadmap;
        });
        return response()->json([
            'message' => 'Roadmap created successfully',
            'data'    => $roadmap->load('modules.skills'),
        ], 201);
    }

    public function show(Roadmap $roadmap)
    {
        return response()->json(
            $roadmap->load('modules.skills.skill_resource_links')
        );
    }

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
        try {
            // 1. Delete from pivot table directly
            DB::table('roadmap_roadmap_modules')
                ->where('roadmap_id', $roadmap->id)
                ->delete();

            // 2. Now delete the roadmap
            $roadmap->delete();

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
