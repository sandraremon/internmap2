<?php

namespace App\Models\Company;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\Recruiter;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Company extends Model{
    protected $table='company';
     public function recruiter() :BelongsToMany
    {
        return $this->belongsToMany(Recruiter::class);
    }

}
