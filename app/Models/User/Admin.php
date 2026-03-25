<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin extends User
{

    protected $table = 'admin';

    protected $fillable = ['id', 'permission_level'];

    protected $primaryKey = 'id';
    public $incrementing = false;
    public $timestamps = false;

    public function user() :BelongsTo
    {
        //the link between them is here
        return $this->belongsTo(User::class, 'id', 'id');
    }

}
