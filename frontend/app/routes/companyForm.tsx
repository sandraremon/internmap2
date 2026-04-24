import ApplicationForm  from "~/FrontendWebpages/ApplicationForm";
import {useLoaderData} from "react-router";
import RegisterCompany from "~/FrontendWebpages/CompanyForm";
export function meta() {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}
export async function clientLoader({ request }) {

    const res = await fetch("http://127.0.0.1:8000/company/register", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    // const response = await fetch("http://127.0.0.1:8000/company/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //     },
    //     body: JSON.stringify(form),
    // });
    if (!res.ok) {
        throw new Response("Failed to load application page", { status: res.status });
    }

    return await res.json();
}
export default function ApplyRoute() {
    const data = useLoaderData();

    return <RegisterCompany company={data} />;
}
