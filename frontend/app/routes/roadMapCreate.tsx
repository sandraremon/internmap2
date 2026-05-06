import RoadmapForm  from "../FrontendWebpages/RoadmapCreate";
import {useLoaderData} from "react-router";
import type {Route} from "../../.react-router/types/app/routes/+types/login";
export function meta() {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader({ }) {
}


export default function roadMapCreate({loaderData}: Route.ComponentProps) {
    return <RoadmapForm/>;
}
