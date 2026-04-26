import type { Route } from "./+types/home";
import Welcome from "../FrontendWebpages/Welcome";
import Loading from "../FrontendWebpages/fragments/Loading";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader() {
    const [roadmapsRes, jobPostingsRes] = await Promise.all([
        fetch("http://localhost:8000/api/roadmap"),
        fetch("http://localhost:8000/api/jobposting"),
    ]);

    const roadmaps = await roadmapsRes.json();
    const jobPostings = await jobPostingsRes.json();

    console.log(jobPostings);  // check the console

    return { roadmaps, jobPostings };
}

export function HydrateFallback() {
    return <Loading />;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { roadmaps } = loaderData;
    const {jobPostings  } = loaderData;
    return <Welcome roadmaps={roadmaps} jobPostings={jobPostings} />;
}
