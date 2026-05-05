import RoadmapForm  from "../FrontendWebpages/RoadMapUpdate";
import {useLoaderData} from "react-router";
import type {Route} from "../../.react-router/types/app/routes/+types/login";
import RoadMapEdit from "../FrontendWebpages/RoadMapUpdate";
import roadmap from "../FrontendWebpages/Roadmap";
export function meta() {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader({ }) {
}


export default function roadMapCreate({loaderData}: Route.ComponentProps) {
    // @ts-ignore
    return <RoadMapEdit roadmap={roadmap}/>;
}

