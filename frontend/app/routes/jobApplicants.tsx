import MyJobApplicants from "../FrontendWebpages/JobApplicants";
import Loading from "../FrontendWebpages/fragments/Loading";
import type { Route } from "./+types/login";

export async function clientLoader({ params }: Route.LoaderArgs) {
    // @ts-ignore
    const data = await fetch(`http://127.0.0.1:8000/api/job/${params.id}/applicants`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
        },
    });
    return await data.json();
}

export function HydrateFallback() {
    return <Loading />;
}

export default function jobApplicants({ loaderData }: Route.ComponentProps) {
    const applications = loaderData as Application[];
    return <MyJobApplicants applications={applications} />;
}
