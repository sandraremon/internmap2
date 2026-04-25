<?php

namespace App\Models\Application;
use App\Models\JobPosting\JobPosting;
use App\Models\User\Student;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(array $array)
 * @method createToken(string $string)
 * @property UserRole $role=$role
 * @property Student $student = $student
 * @property JobPosting $jobPosting = $jobPosting
 */
class Application extends Model
{

    protected $table = 'application';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $fillable=['email', 'f_name', 'l_name', 'phone_number'];

    public function Student(): BelongsTo
    {
        //the link between them is here by belongsTo
        return $this->belongsTo(Student::class, 'id', 'id');
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class, 'id', 'id');
    }
}
