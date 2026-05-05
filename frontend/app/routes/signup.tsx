import type {Route} from "./+types/home";
import {redirect} from "react-router";
import Signup from "../FrontendWebpages/Signup";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Log in" },
        { name: "description", content: "Welcome to our 4th semester project's Log in page" },
    ];
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function signup({loaderData}: Route.ComponentProps) {
    return <Signup/>;
}
