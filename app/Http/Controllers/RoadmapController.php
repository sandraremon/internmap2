<?php

namespace App\Http\Controllers;

use App\Models\Roadmap\RoadmapModule;
use App\Models\Roadmap\Skill\Skill;
use App\Models\UserRole;
use Illuminate\Http\Request;
use App\Models\Roadmap\Roadmap;
use Illuminate\Support\Facades\DB;
use Throwable;

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

//    public function store(Request $request)
//    {
//        $user = auth()->user();
//
//        if ($user->role !== UserRole::ADMIN->value) {
//            abort(403);
//        }
//
//        $validated = $request->validate([
//            'name' => 'required|string|max:255'
//        ]);
//
//        $roadmap = Roadmap::create($validated);
//
//        return response()->json($roadmap, 201);
//    }
    /**
     * @throws Throwable
     */
    public function store(Request $request)
    {
        // ── Auth check ─────────────────────────────────────────────────────────
//        $user = auth()->user();

//        if ($user->role !== UserRole::ADMIN->value) {
//            abort(403, 'Unauthorized');
//        }

        // ── Validate everything at once ────────────────────────────────────────
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
        ]);

        // ── Wrap everything in a transaction ───────────────────────────────────
        // If anything fails, ALL of it gets rolled back — no broken data in DB
        $roadmap = DB::transaction(function () use ($validated) {

            // Step 1: Create the roadmap
            $roadmap = Roadmap::create([
                'name'        => $validated['name'],
            ]);
            // Step 2: Loop over each module
            foreach ($validated['modules'] as $moduleData) {

                // Create the module
                $module = RoadmapModule::create([
                    'name'        => $moduleData['name'],
                    'description' => $moduleData['description'],
                ]);

                // Attach module to roadmap (writes to pivot table)
                $roadmap->modules()->attach($module->id);

                // Step 3: Loop over each skill inside this module
                foreach ($moduleData['skills'] as $skillData) {

                    // Create the skill
                    $skill = Skill::create([
                        'name'        => $skillData['name'],
                        'description' => $skillData['description'],
                    ]);

                    // Attach skill to module (writes to pivot table)
                    $module->skills()->attach($skill->id);
                }
            }

            return $roadmap;
        });

        // ── Return the full roadmap with its modules and skills ────────────────
        return response()->json([
            'message' => 'Roadmap created successfully',
            'data'    => $roadmap->load('modules.skills'),
        ], 201);
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
