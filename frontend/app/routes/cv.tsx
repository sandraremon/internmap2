import type { Route } from "./+types/login";
import Loading from "../FrontendWebpages/fragments/Loading";
import CreateCv from "../FrontendWebpages/CV";


export function loader() {
    return {};
}

export function HydrateFallback() {
    return <Loading/>;
}

export default function cv({loaderData}: Route.ComponentProps) {
    return <CreateCv/>;
}
