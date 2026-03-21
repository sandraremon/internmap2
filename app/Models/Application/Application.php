<?php

namespace App\Models\Application;
use App\Models\User\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Application extends Model{
    protected $table='application';
    public function Student() :BelongsTo
    {
        //the link between them is here by belongsTo
        return $this->belongsTo(Student::class, 'id', 'id');
        // , 'id','id'
    }
}
