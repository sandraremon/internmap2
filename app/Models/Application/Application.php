<?php

namespace App\Models\Application;
use App\Models\JobPosting\JobPosting;
use App\Models\User\Admin;
use App\Models\User\Recruiter;
use App\Models\User\Student;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * @method static create(array $array)
 * @method static find(string $id)
 * @property Student $student = $student
 * @property JobPosting $job=$job
 *
 */
class Application extends Model
{

    protected $table = 'application';
    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable= ['email', 'f_name', 'l_name', 'phone_number', 'job_id', 'student_id','application_date','status'];


    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class,'job_id');
    }
}
