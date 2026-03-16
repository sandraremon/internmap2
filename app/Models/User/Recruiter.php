<?php

namespace App\Models\User;
use App\Models\Company\Company;
class Recruiter extends User
{
 protected $table = 'recruiter'; 
 public function companies()
    {
        return $this->belongsToMany(Company::class);
    }
}
