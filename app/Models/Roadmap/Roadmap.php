<?php

namespace App\Models\Roadmap;
use App\Models\User\Recruiter;
use App\Models\User\Student;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method static create(array $array)
 * @method static find(string $id)
 * @method createToken(string $string)
 *
 */
class Roadmap extends Model
{

    protected $table = 'roadmap';

    protected $primaryKey ='id';

    protected $fillable = ['name'];
    public $timestamps = false;

    public function modules(): BelongsToMany
    {
        return $this->belongsToMany(
            RoadmapModule::class,
            'roadmap_roadmap_modules',   // pivot table
            'roadmap_id',                // FK on pivot for roadmap
            'roadmap_modules_id'          // FK on pivot for module
        );
    }
}
