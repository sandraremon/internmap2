import ApplicationForm from "../FrontendWebpages/ApplicationForm";

export function meta() {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader() {
    return {};
}

export default function ApplyRoute() {
    return <ApplicationForm />;
}
