<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    protected $table = 'users';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = ['f_name','l_name', 'email', 'plain_password'];

    //Basically means every recruiter has one user with this specific id
    //This simulates inheritance of user for recruiter
    public function recruiter(): HasOne
    {
        return $this->hasOne(Recruiter::class, 'id');
    }

    public function student(): HasOne
    {
        return $this->hasOne(Student::class, 'id');
    }

    public function admin(): HasOne
    {
        return $this->hasOne(Admin::class, 'id');
    }
}
