import { useState, useEffect } from "react";

export default function Home() {
    const [roadmap, setRoadmap] = useState([]);
    const [err, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async function inside the effect
        const sendData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/roadmap", { // Point to an API route
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ roadmap }),
                });

                if (!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                console.log(data);
            } catch (err) {
                console.error(err);
                setError("Server error");
            } finally {
                setLoading(false);
            }
        };

        sendData();
    }, []); // The empty array [] means this runs ONLY once when the page loads

    if (loading) return <div>Loading...</div>;
    if (err) return <div>{err}</div>;

    return (
        <div>
            <h1>Roadmap</h1>
            {/* Render your data here */}
        </div>
    );
}
