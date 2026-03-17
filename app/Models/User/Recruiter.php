<?php

namespace App\Models\User;
use App\Models\Company\Company;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recruiter extends User
{
 protected $table = 'recruiter';
 protected $fillable = ['user_id','title'];
 public $timestamps = false;
 //this shows the inhertance relationship between rec and user
    public function user() :BelongsTo
    {
        //the link between them is here
        return $this->belongsTo(User::class, 'user_id');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class,'recruiter_companies');
    }
}
