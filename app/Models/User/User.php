<?php

namespace App\Models\User;


use App\Models\UserRole;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;


/**
 * @method static create(array $array)
 * @method static find(string $id)
 * @method createToken(string $string)
 * @property Recruiter $recruiter = $recruiter
 * @property UserRole $role=$role
 * @property Student $student = $student
 * @property Admin $admin = $admin
 *
 */

class User extends Authenticatable
{
    use HasApiTokens;
    protected $primaryKey = 'id';
    protected $table = 'users';

    public $incrementing = true;

    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = ['f_name','l_name', 'email', 'password', 'role','profile_pic'];

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
