<?php

namespace App\Models\CV;

use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use phpDocumentor\Reflection\DocBlock\Description;

class cv extends Model
{
    //id should be insrementing
    protected $table = 'cv';

    protected $primaryKey = 'cvID';

    public $incrementing = true;

    protected $fillable = ['Description' , 'pastExperience' , 'projects'];

    public function Student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'id');
    }
}
