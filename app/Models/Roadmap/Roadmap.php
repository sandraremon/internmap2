<?php

namespace App\Models\Roadmap;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roadmap extends Model
{
    protected $table = 'roadmap';

    protected $fillable=['id','name'];
    public function RoadmapModule(): HasMany{
        return $this->hasMany(RoadmapModule::class, 'id');
    }
}
