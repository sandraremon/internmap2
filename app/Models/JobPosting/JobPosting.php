<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;

use App\Models\JobPosting\Internship;
use App\Models\JobPosting\FullTime;
use App\Models\JobPosting\FreelanceProject;


use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class JobPosting extends Model{
    //it needs company relationship and recruiter relationship
    protected $table='job_posting';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $primaryKey = 'id';

    protected $fillable=['id','job_description','job_name','job_requirements', 'date_posted'];
    public $timestamps=false;

    public function recruiter():BelongsTo
    {
        return $this->belongsTo(Recruiter::class, 'recruiter_id');
    }
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
    public function internship(): HasOne{
        return $this->hasOne(Internship::class, 'id_internship');
    }

    public function fullTime():HasOne
    {
        return $this->hasOne(FullTime::class,'id');
    }

    public function freelanceProject():HasOne
    {
        return $this->hasOne(FreelanceProject::class,'id','id');
    }
}
