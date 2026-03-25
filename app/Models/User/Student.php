<?php

namespace App\Models\User;
use App\Models\Application\Application;
use App\Models\Roadmap\Skill\Skill;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Student extends User
{
    protected $table = 'student';

//  the id should be generated
    protected $primaryKey = 'id';
//   laravel automatically increments the id in every class, but my user id and student id are the same
    public $incrementing = false;

//   public $timestamps = false;
//   'id' IS here because it's the "link" we have to save.
    protected $fillable = ['id','uni_name','student_major','faculty','graduating_year'];

    public function user() :BelongsTo
    {
        //the link between them is here by belongsTo
        return $this->belongsTo(User::class, 'id', 'id');
        // , 'id','id'
    }

    public function Application(): HasMany
    {
        return $this->hasMany(Application::class, 'id');
    }

    public function Skill(): BelongsToMany {
        return $this->belongstoMany(Skill::class, 'id');
    }

}
