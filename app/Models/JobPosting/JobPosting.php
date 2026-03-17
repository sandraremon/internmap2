<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;
class JobPosting extends Model{
    protected $table='job_posting';
     public function internship()
    {
        return $this->hasOne(Internship::class,'id','id');
    }

    public function fullTime()
    {
        return $this->hasOne(FullTime::class,'id','id');
    }

    public function freelance()
    {
        return $this->hasOne(FreelanceProject::class,'id','id');
    }
}
