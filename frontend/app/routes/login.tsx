import type { Route } from "./+types/login";
import Login from "../FrontendWebpages/Login";
import Loading from "../FrontendWebpages/fragments/Loading";
import { redirect } from "react-router";
export function loader() {
    // 1. Is this the browser?
    if (typeof window !== "undefined") {

        // 2. Now it is safe to touch browser-only features
        const token = localStorage.getItem("token");
        console.log(token);

    } else {
        // 3. We are on the server.
        // We can't see localStorage here!
        console.log("Running on the server...");
    }

    return {};
}

export function HydrateFallback() {
    return <Loading/>;
}

export default function login({loaderData}: Route.ComponentProps) {
    return <Login/>;
}
