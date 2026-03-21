<?php

namespace App\Models\Roadmap\Skill;
use App\Models\Roadmap\RoadmapModule;
use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Skill extends Model{
    protected $table = 'skill';
    protected $fillable = ['description', 'name'];
    public $timestamps = false;
    public array $skill_resource_links = [];
    public function RoadmapModule() :BelongsTo
    {
        return $this->belongsTo(RoadmapModule::class, 'id', 'id');
    }
    public function student(): HasMany
    {
        return $this->hasMany(Student::class, 'id');
    }

}
