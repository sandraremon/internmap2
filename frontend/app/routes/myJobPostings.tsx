import type { Route } from "./+types/login";
import Loading from "../FrontendWebpages/fragments/Loading";
import Profile from "../FrontendWebpages/Profile";
import MyJobPostings from "../FrontendWebpages/MyJobPostings";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My Job Postings" },
        { name: "Your own Job Postings", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader() {
    if (!localStorage.getItem("token")) {
        return Response.redirect("/login", 302);
    }

    const data = await fetch("http://127.0.0.1:8000/api/myJobPostings", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
        },
    });
    const json = await data.json();
    if (!data.ok) {
        //return Response.redirect("/login", 302);
        console.log("Response:", json);
    }


   // console.log("Response:", json);

    return json;
}

export function HydrateFallback() {
    return <Loading/>;
}

export default function myJobPostings({ loaderData }: Route.ComponentProps) {
    const jobPostings: JobPosting[] = loaderData as JobPosting[];
    return <MyJobPostings jobPostings={jobPostings} />;
}
