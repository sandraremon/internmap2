import type { Route } from "./+types/login";
import Loading from "../FrontendWebpages/fragments/Loading";
import Profile from "../FrontendWebpages/Profile";
import type {Roadmap} from "../../Model/Roadmap";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Profile" },
        { name: "Your own profile", content: "Welcome to our 4th semester project" },
    ];
}

export async function clientLoader() {
    const token = localStorage.getItem("token");

    if (!token) {
        return Response.redirect("/login", 302);
    }

    const profileRes = await fetch("http://127.0.0.1:8000/api/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!profileRes.ok) {
        return Response.redirect("/login", 302);
    }

    const user = await profileRes.json();

    if (user.role === "ADMIN") {
        const [roadmapsRes, usersRes] = await Promise.all([
            fetch("http://localhost:8000/api/roadmap"),
            fetch("http://localhost:8000/api/users/"),
        ]);

        return {
            user,
            roadmaps: await roadmapsRes.json(),
            users: await usersRes.json(),
        };
    }

    return { user };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const token = localStorage.getItem("token");
    if (!token) return Response.redirect("/login", 302);

    const body = await request.json();

    const users: User[] = typeof body.users === "string" ? JSON.parse(body.users) : body.users ?? [];
    const roadmaps: Roadmap[] = typeof body.roadmaps === "string" ? JSON.parse(body.roadmaps) : body.roadmaps ?? [];

    for (const user of users) {
        const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Response(`Failed to delete user ${user.id}`, { status: res.status });
    }

    for (const roadmap of roadmaps) {
        const res = await fetch(`http://localhost:8000/api/roadmap/${roadmap.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Response(`Failed to delete roadmap ${roadmap.id}`, { status: res.status });
    }

    return { success: true };
    // const token = localStorage.getItem("token");
    //
    // if (!token) {
    //     return Response.redirect("/login", 302);
    // }
    //
    // const formData = await request.formData();
    // const intent = formData.get("intent");
    //
    // if (intent === "deleteUsers") {
    //     const users = JSON.parse(formData.get("users") as string ?? "[]");
    //
    //     for (const user of users) {
    //         const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         if (!res.ok) throw new Response(`Failed to delete user ${user.id}`, { status: res.status });
    //     }
    //
    //     return { success: true };
    // }
    //
    // if (intent === "deleteRoadmaps") {
    //     const roadmaps = JSON.parse(formData.get("roadmaps") as string ?? "[]");
    //
    //     for (const roadmap of roadmaps) {
    //         const res = await fetch(`http://localhost:8000/api/roadmap/${roadmap.id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         console.log(`Deleted roadmap ${roadmap.id}:`, res.status);
    //         if (!res.ok) throw new Response(`Failed to delete roadmap ${roadmap.id}`, { status: res.status });
    //     }
    //
    //     return { success: true };
    // }
    //
    // return null;
}

export function HydrateFallback() {
    return <Loading />;
}

export default function ProfileRoute({ loaderData }: Route.ComponentProps) {
    const data = loaderData as any;

    return (
        <Profile
            userDetails={data.user}
            roadmaps={data.roadmaps}
            users={data.users}
        />
    );
}
