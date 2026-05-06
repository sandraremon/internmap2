<?php

namespace App\Models\Application;

enum appStatus: string
{


    case PENDING = 'PENDING';
    case ACCEPTED = 'ACCEPTED';
    case REJECTED = 'REJECTED';

}
