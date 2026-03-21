<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FullTime extends JobPosting{
    protected $table='full_time';

    protected $fillable=['benefits'];
        public function JobPosting() :BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'id');
    }
}
