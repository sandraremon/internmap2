<?php

namespace App\Models\Roadmap;
use Illuminate\Database\Eloquent\Model;
class Roadmap extends Model
{
    protected $table = 'roadmap';

    protected $fillable=['id','name'];
    public function RoadmapModule(): HasMany{
        return $this->hasMany(RoadmapModule::class, 'id');
    }
}