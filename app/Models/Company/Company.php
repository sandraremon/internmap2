<?php

namespace App\Models\Company;
use App\Models\JobPosting\JobPosting;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\Recruiter;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $validated)
 */
class Company extends Model
{
    protected $table = 'company';

    protected $primaryKey = 'id';

    protected $fillable = ['industry', 'location_ofhq', 'name', 'websiteurl'];

    public function JobPosting(): HasMany
    {
        return $this->HasMany(JobPosting::class,'id');
    }

     public function recruiter(): BelongsToMany
    {
        return $this->belongsToMany(Recruiter::class);
    }
}
