<?php

namespace App\Models\Roadmap;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Roadmap extends Model
{

    protected $table = 'roadmap';

    protected $primaryKey ='id';

    protected $fillable = ['name'];

    public function RoadmapModule(): BelongsToMany
    {
        return $this->belongsToMany(RoadmapModule::class, 'roadmap_roadmap_modules');
    }
}
