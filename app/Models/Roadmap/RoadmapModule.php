<?php

namespace App\Models\Roadmap;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoadmapModule extends Model
{
    protected $table = 'roadmap_module';
}
