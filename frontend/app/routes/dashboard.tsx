// import Dashboard from "../FrontendWebpages/Dashboard";
// import type { Route } from "../+types/root";
// import {useLoaderData} from "react-router";
// //  step one delete whatever the first line was
// // step two create the webpage and get the clientLoader to fetch the data from the controller and pass it to the webpage
// // and then create the dashboard function that will return the webpage with the data from the clientLoader and then create the clientAction function that will handle the delete action and then create the meta function that will set the title and description of the page
//
// export function meta() {
//     return [
//         { title: "InternMap" },
//         { name: "description", content: "Welcome to our 4th semester project" },
//     ];
// }
//
// export async function clientLoader() {
//
//
//
//     const [roadmapsRes,usersRes] = await Promise.all([
//         fetch("http://localhost:8000/api/roadmap"),
//         fetch("http://localhost:8000/api/users/"),
//     ]);
//
//     const roadmaps = await roadmapsRes.json();
//     const users = await usersRes.json();
//
//     console.log(users);  // check the console
//
//     return { roadmaps, users };
// }
//
// // @ts-ignore
// export async function clientAction({ request }) {
//     const body = await request.json();
//     const users = typeof body.users === "string" ? JSON.parse(body.users) : body.users ?? [];
//     const roadmaps = typeof body.roadmaps === "string" ? JSON.parse(body.roadmaps) : body.roadmaps ?? [];
//     console.log("users:", users);      // should now be an array of objects
//     console.log("roadmaps:", roadmaps);
//     if (users.length > 0) {
//         for (const user of users) {
//             const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
//                 method: "DELETE",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json"
//                 },
//             });
//             if (!response.ok) throw new Response(`Failed to delete user`, { status: response.status });
//         }
//     }
//
//     if (roadmaps.length > 0) {
//         for (const roadmap of roadmaps) {
//             const response = await fetch(`http://localhost:8000/api/roadmap/${roadmap.id}`, {
//                 method: "DELETE",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json"
//                 },
//             });
//             console.log(`Deleting roadmap with ID: ${roadmap.id}, Response status: ${response.status}`);  // log the response status
//             if (!response.ok) throw new Response(`Failed to delete roadmap`, { status: response.status });
//         }
//     }
//
//     return { success: true };
// }
//
// export default function dashboard({ }: Route.ComponentProps) {
//     const loaderData = useLoaderData();
//
//     return (
//         <Dashboard
//             users={loaderData.users}
//             roadmaps={loaderData.roadmaps}
//         />
//     );}
