<?php

namespace App\Models\User;
use App\Models\Company\Company;
use App\Models\JobPosting\JobPosting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Recruiter extends User
{
 protected $table = 'recruiter';
 //he can only fill the title , the id is genrated
 protected $fillable = ['id','title'];
 protected $primaryKey = 'id';
 public $incrementing = false;
 public $timestamps = false;
 //this shows the inhertance relationship between rec and user
    public function user() :BelongsTo
    {
        //the link between them is here
        return $this->belongsTo(User::class, 'id', 'id');
    }
    public function company():BelongsToMany
    {
        return $this->belongsToMany(Company::class,'recruiter_companies');
    }
    public function JobPosting():HasMany
    {
        return $this->HasMany(JobPosting::class,'id');
    }
}
