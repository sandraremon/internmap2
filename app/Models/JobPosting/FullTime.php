<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;
class FullTime extends JobPosting{
    protected $table='full_time';
        public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class,'id','id');
    }
}
