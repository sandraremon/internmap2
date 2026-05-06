import type { Route } from "./+types/login";
import Loading from "../FrontendWebpages/fragments/Loading";
import RegisterCompany from "../FrontendWebpages/CompanyForm";

export function loader() {
    return {};
}

export function HydrateFallback() {
    return <Loading/>;
}

export default function login({loaderData}: Route.ComponentProps) {
    return <RegisterCompany/>;
}
