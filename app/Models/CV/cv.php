<?php

namespace App\Models\CV;

use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class cv extends Model
{
    //id should be insrementing
    protected $table = 'cv';
    protected $primaryKey = 'cv_id';
    public $incrementing = true;

    protected $fillable = ['description','past_experiences' , 'projects'];
    public function Student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'id');
    }
}
