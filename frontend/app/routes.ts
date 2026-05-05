import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/company/register", "routes/companyForm.tsx"),
    route("/signup", "routes/signup.tsx"),
    route("/recruiter/register", "routes/recRegister.tsx"),
    route("/roadmap/create", "routes/roadMapCreate.tsx"),
    // route("/cv/create", "routes/cv.tsx"),
    route("/dashboard","routes/dashboard.tsx"),
    route("/logout","routes/logout.tsx"),
    route("/roadmaps/:id", "routes/roadMapView.tsx"),
    route("/application/:id", "routes/applicationForm.tsx"),
    route("/profile", "routes/profile.tsx"),
    route("/myJobPostings", "routes/myJobPostings.tsx"),
    route("/job/:id/applicants", "routes/jobApplicants.tsx"),


    // route("/apply/:id", "routes/apply.tsx"),  // ADD THIS

    // route("/", "routes/home.tsx"),
];
