import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";// we need this for error displaying
import "./app.css";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html >
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <title>Sign In</title>
        </head>
        <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
