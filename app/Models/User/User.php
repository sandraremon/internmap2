<?php

namespace App\Models\User;

use App\Models\Company\Company;
use App\Models\UserRole;
use App\Models\User\Recruiter;
use App\Models\User\Student;
use App\Models\User\Admin;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use phpDocumentor\Reflection\DocBlock\Tags\Property;

/**
 * @method static create(array $array)
 * @method static find(string $id)
 * @property Recruiter $recruiter = $recruiter
 * @property UserRole $role=$role
 * @property Student $student = $student
 *
 */

class User extends Authenticatable
{
    protected $primaryKey='id';
    protected $table = 'users';

    public $incrementing = true;

    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = ['f_name','l_name', 'email', 'password','role'];

    protected $casts = [
        'role' => UserRole::class,
    ];
    //Basically means every recruiter has one user with this specific id
    //This simulates inheritance of user for recruiter
    public function recruiter(): HasOne
    {
        return $this->hasOne(Recruiter::class, 'id','id');
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
