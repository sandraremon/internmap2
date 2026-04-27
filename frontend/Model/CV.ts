class CV {

    cv_id: bigint;
    description: String;
    past_experiences: String;
    projects: String;


    constructor(cv_id: bigint, description: String, past_experiences: String, projects: String) {
        this.cv_id = cv_id;
        this.description = description;
        this.past_experiences = past_experiences;
        this.projects = projects;
    }
}
