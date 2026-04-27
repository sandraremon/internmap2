<?php

namespace App\Models\Company;
use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\Recruiter;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $validated)
 * @method static find(string $id)
 */
class Company extends Model
{
    protected $table = 'company';

    protected $primaryKey = 'id';

    protected $fillable = ['industry', 'location_ofhq', 'name', 'websiteurl', 'recruiter_id',
        'recruiters_id'
    ];
    public $timestamps = false;

    public function JobPosting(): HasMany
    {
        return $this->HasMany(JobPosting::class,'id');
    }

     public function recruiter(): BelongsToMany
    {
        return $this->belongsToMany(Recruiter::class,'recruiter_companies','companies_id','recruiters_id');
    }
}
