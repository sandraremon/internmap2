import type { Route } from "./+types/login";
import Login from "../FrontendWebpages/Login";
import Loading from "../FrontendWebpages/fragments/Loading";
import { redirect } from "react-router";
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
