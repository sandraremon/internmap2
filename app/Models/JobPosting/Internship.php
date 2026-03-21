<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;
class Internship extends Model
{
    protected $table='internship';
        public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class,'id');
    }

}
