import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/company/register", "routes/companyForm.tsx"),
    route("/recruiter/register", "routes/recRegister.tsx"),
    route("/roadmap/create", "routes/roadMapCreate.tsx"),
    // route("/", "routes/home.tsx"),
];
