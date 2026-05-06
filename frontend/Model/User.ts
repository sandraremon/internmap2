class User {

    email: String;
    f_name: String;
    l_name: String;
    role: String;
    id: bigint;
    created_at: Date
    student: Student;
    recruiter: Recruiter

    constructor(email: String, f_name: String, l_name: String, role: String, id: bigint, created_at: Date, student: Student, recruiter: Recruiter) {
        this.email = email;
        this.f_name = f_name;
        this.l_name = l_name;
        this.role = role;
        this.id = id;
        this.created_at = created_at;
        this.student=student;
        this.recruiter=recruiter;
    }
}
