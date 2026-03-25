<?php

namespace App\Models\Roadmap\Skill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class skill_resource_links extends Model
{
    protected $table = 'skill_resource_links';

    protected $fillable = ['resource_links'];

    public function skill(): BelongsTo
    {
        return $this->BelongsTo(Skill::class, 'id');
    }
}
