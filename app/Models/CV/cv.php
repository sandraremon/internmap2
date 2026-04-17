<?php

namespace App\Models\CV;

use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(array $validated)
 */
class cv extends Model
{
    //id should be incrementing
    protected $table = 'cv';

    protected $primaryKey = 'cv_id';
    public $incrementing = true;

    protected $fillable = ['description', 'past_experiences', 'projects'];
    public $timestamps = false;

    public function Student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'id');
    }



}
