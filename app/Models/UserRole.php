<?php

namespace App\Models;

enum UserRole: string {

    case STUDENT = 'STUDENT';   // Match exactly what is in your DB
    case RECRUITER = 'RECRUITER';
    case ADMIN = 'ADMIN';

    public function roleName(): string
    {
        return match($this) {
            self::STUDENT => 'ROLE_STUDENT',
            self::RECRUITER => 'ROLE_RECRUITER',
            self::ADMIN => 'ROLE_ADMIN',
        };
    }

}
