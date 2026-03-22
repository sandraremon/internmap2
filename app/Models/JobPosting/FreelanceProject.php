<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class FreelanceProject extends JobPosting{
    protected $table='freelance_project';
    protected $primaryKey='id';
    public $timestamps= false;
    //id is in fillable cuz it's the same id as jobPosting
    protected $fillable=['duration' , 'payout' , 'job_location','id'];
    public function JobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'id','id');
    }
}
