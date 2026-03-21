<?php

namespace App\Models\Company;
use App\Models\JobPosting\JobPosting;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\Recruiter;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Company extends Model{
    protected $table='company';
    protected $primaryKey = 'companyID';


    protected $fillable = ['name', 'websiteURL','locationOfHQ'];
    public function JobPosting():HasMany
    {
        return $this->HasMany(JobPosting::class,'id');
    }

     public function recruiter() :BelongsToMany
    {
        return $this->belongsToMany(Recruiter::class);
    }

}
