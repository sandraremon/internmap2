class JobPosting {

    id: bigint;
    job_description: String;
    job_name: String;
    // jobName: String;


    company: Company;

    locationOfHQ: String;
    date_posted: Date;
    recruiter: Recruiter;


    constructor(id: bigint, job_description: String, job_name: String, jobName: String, job_requirements: String, company: Company, locationOfHQ: String, date_posted: Date, recruiter: Recruiter) {
        this.id = id;
        this.job_description = job_description;
        this.job_name = job_name;
        // this.jobName = jobName;
        this.company = company;
        this.locationOfHQ = locationOfHQ;
        this.date_posted = date_posted;
        this.recruiter = recruiter;
    }
}
