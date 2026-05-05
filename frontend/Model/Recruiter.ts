class Recruiter extends User {

    title: string
    companies: Company[]
    jobPostings: JobPosting[];

    constructor(email: String, fname: String, lname: String, role: String, id: bigint, dateCreated: Date, title: string, companies: Company[], jobPostings: JobPosting[]) {
        super(email, fname, lname, role, id, dateCreated);
        this.title = title;
        this.companies = companies;
        this.jobPostings=jobPostings;
    }
}
