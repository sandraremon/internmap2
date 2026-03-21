<?php

namespace App\Models\Roadmap;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoadmapModule extends Model
{
    protected $table = 'roadmap_module';
    protected $primaryKey = 'roadmap_module_id';

    protected $fillable = [ 'name' , 'description'];
    public function Roadmap() :BelongsTo
    {
        //the link between them is here by belongsTo
        return $this->belongsTo(Roadmap::class, 'id', 'id');
        // , 'id','id'
    }
    public function skill(): HasMany
    {
        return $this->hasMany(Skill::class, 'id');
    }
}
