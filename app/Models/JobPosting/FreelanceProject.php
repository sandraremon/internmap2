<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;
class FreelanceProject extends JobPosting{
protected $table='freelance_project';
    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class,'id','id');
    }
}
