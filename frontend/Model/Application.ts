class Application {

    id: bigint
    f_name: string
    l_name: string
    email: string
    phone_number: string
    application_date: Date
    jobPosting: JobPosting


    constructor(id: bigint, f_name: string, l_name: string, email: string, phone_number: string, application_date: Date, jobPosting: JobPosting) {
        this.id = id;
        this.f_name = f_name;
        this.l_name = l_name;
        this.email = email;
        this.phone_number = phone_number;
        this.application_date = application_date;
        this.jobPosting = jobPosting;
    }
}
