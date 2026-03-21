<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Internship extends JobPosting
{
    protected $table='internship';
    protected $primaryKey = 'id_internship';

    protected $fillable=['duration' , 'job_location','id'];
        public function JobPosting() :BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'id');
    }

}
