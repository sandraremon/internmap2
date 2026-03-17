<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
 protected $table = 'users'; // existing table name
public $incrementing = true; 
protected $keyType = 'int';
   
    protected $fillable = ['f_name','l_name', 'email', 'plain_password'];

    //basically means user has one recruiter with this specific id
    //this simulates inhertance of user for recruiter
    public function recruiter(): HasOne{
        return $this->hasOne(Recruiter::class, 'id');
    }
    public function student(): HasOne{
        return $this->hasOne(Student::class, 'id');
    }
    public function admin(): HasOne{
        return $this->hasOne(Admin::class, 'id');
    }

}   


