<?php

namespace App\Models\Roadmap;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * @method static create(array $array)
 * @method static find(string $id)
 * @method createToken(string $string)

 *
 */
class RoadmapModule extends Model
{

    protected $table = 'roadmap_module';

    protected $primaryKey = 'roadmap_module_id';

    protected $fillable = ['name' , 'description'];

    public function roadmaps(): BelongsToMany
    {
        return $this->belongsToMany(
            Roadmap::class,
            'roadmap_roadmap_modules',
            'roadmap_module_id',
            'roadmap_id'
        );
    }


    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class, 'id');
    }
}
