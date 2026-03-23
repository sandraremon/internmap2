<?php

namespace App\Models;

enum UserRole: int {

    case STUDENT = 1;
    case RECRUITER = 2;
    case ADMIN = 3;

    public function roleName(): string
    {
        return match($this) {
            self::STUDENT => 'ROLE_STUDENT',
            self::RECRUITER => 'ROLE_RECRUITER',
            self::ADMIN => 'ROLE_ADMIN',
        };
    }

}
