<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
class FreelanceProject extends JobPosting{
protected $table='freelance_project';


protected $fillable=['Duration' , 'Payout' , 'jobLocation'];
    public function JobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'id','id');
    }
}
