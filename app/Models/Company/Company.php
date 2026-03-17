<?php

namespace App\Models\Company;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\Recruiter;

class Company extends Model{
    protected $table='company';
     public function recruiters()
    {
        return $this->belongsToMany(Recruiter::class);
    }
}
