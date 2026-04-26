<?php

namespace App\Models\Roadmap\Skill;
use App\Models\Roadmap\RoadmapModule;
use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * @method static create(array $validated)
 */
class Skill extends Model
{

    protected $table = 'skill';

    protected $primaryKey = 'id';

    protected $fillable = ['description', 'name'];
    public $timestamps = false;

    public function roadmapModules() :BelongsToMany
    {
        return $this->belongsToMany(
            RoadmapModule::class,
            'roadmap_module_skills',
            'skills_id',
            'roadmap_module_id');
    }

    public function student(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'skill');
    }

    public function skill_resource_links(): HasMany
    {
        return $this->hasMany(skill_resource_links::class, 'skill_id');
    }

}
