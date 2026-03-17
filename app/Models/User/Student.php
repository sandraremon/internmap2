<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends User
{
 protected $table = 'student';
// // the id should be generated
  protected $primaryKey = 'id';
//   //laravel automatically increments the id in ever class , but my user id and student id are the same
  public $incrementing = false;
//   public $timestamps = false;
//     // 'id' IS here because it's the "link" we have to save.
  protected $fillable = ['id','uni_name','student_major','faculty','graduating_year'];
    public function user() :BelongsTo
    {
        //the link between them is here by belongsTo
        return $this->belongsTo(User::class, 'id', 'id');
        // , 'id','id'
    }

}
