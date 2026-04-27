class Student extends User {

    graduating_year: number;
    student_major: String;
    faculty: String;
    uni_name: String;
    cv: CV;
    applications: Application[];

    constructor(email: String, f_name: String, l_name: String, role: String, id: bigint, created_at: Date, graduating_year: number, student_major: String, faculty: String, uni_name: String, cv: CV, applications: Application[]) {
        super(email, f_name, l_name, role, id, created_at) ;
        this.graduating_year = graduating_year;
        this.student_major = student_major;
        this.faculty = faculty;
        this.uni_name = uni_name;
        this.cv = cv;
        this.applications = applications;
    }
}
