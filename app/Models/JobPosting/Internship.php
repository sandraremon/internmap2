<?php

namespace App\Models\JobPosting;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
/**
 * @method static create(array $validated)
 * @method static find(string $id)
 */

class Internship extends JobPosting
{
    protected $table = 'internship';
    protected $fillable = ['id','duration','job_location'];

    public function JobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'id');
    }

}
