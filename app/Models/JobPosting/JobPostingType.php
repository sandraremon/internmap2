<?php


namespace App\Models\JobPosting;

enum JobPostingType: string
{

    case FreeLanceProject = 'FreeLanceProject';   // Match exactly what is in your DB
    case Internship = 'Internship';
    case FullTime= 'FullTime';

    public function roleName(): string
    {
        return match ($this) {
            self::FullTime => 'FullTime',
            self::Internship => 'Internship',
            self::FreeLanceProject => 'FreeLanceProject',
        };
    }

}

