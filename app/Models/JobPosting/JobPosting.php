<?php

namespace App\Models\JobPosting;
use App\Models\Company\Company;
use App\Models\User\Recruiter;
use App\Models\User\Student;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @method static create(array $validated)
 * @method static find(string $id)
 * @property Internship $internship = $internship
 * @property JobPostingType $type=$type
 * @property FreelanceProject $freelanceProject = $freelanceProject
 * @property FreelanceProject $fullTime = $fullTime
 */
class JobPosting extends Model
{

    //it needs company relationship and recruiter relationship
    protected $table = 'job_posting';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $primaryKey = 'id';
    protected $fillable = ['recruiter_id', 'company_id', 'job_description', 'job_name', 'job_requirements', 'date_posted','type'];
    protected $casts = [
        'type' => JobPostingType::class,
    ];
    public $timestamps = false;

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class, 'recruiter_id');
    }

    public function company(): BelongsTo
    {
//        'company_id'
        return $this->belongsTo(Company::class);
    }

    public function Internship(): HasOne
    {
        return $this->hasOne(Internship::class, 'id');
    }

    public function FullTime(): HasOne
    {
        return $this->hasOne(FullTime::class,'id');
    }

    public function FreelanceProject(): HasOne
    {
        return $this->hasOne(FreelanceProject::class,'id');
    }

    public function Application(): HasMany
    {
        return $this->HasMany(JobPosting::class,'id');
    }
}
