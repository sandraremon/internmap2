<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
 protected $table = 'users'; // existing table name

    public $timestamps = false;

    //basically meand user has one recruiter with this specific id
    //this simulates inhertance of user for recruiter
    public function recruiter(): HasOne{
        return $this->hasOne(Recruiter::class, 'user_id');
    }
}
// 1-4 ,
