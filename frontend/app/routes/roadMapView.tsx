import RoadMapView from "../FrontendWebpages/RoadMapView";
import type { Route } from "../+types/root";
import {useLoaderData} from "react-router";

//  step one delete whatever the first line was
// step two create the webpage and get the clientLoader to fetch the data from the controller and pass it to the webpage
// and then create the dashboard function that will return the webpage with the data from the clientLoader and then create the clientAction function that will handle the delete action and then create the meta function that will set the title and description of the page

export function meta() {
    return [
        { title: "InternMap" },
        { name: "description", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader({ params }) {
    const res = await fetch(`http://localhost:8000/api/roadmap/${params.id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        throw new Response("Failed to fetch roadmap", { status: res.status });
    }

    return await res.json();
}

// @ts-ignore


export default function roadMapView({}: Route.ComponentProps) {
    const roadmap = useLoaderData();
    return <RoadMapView roadmap={roadmap} />;
}
