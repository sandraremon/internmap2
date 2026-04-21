import {useEffect, useState} from "react";
import {getRoadmaps} from "../services/api";
import Roadmap from "../components/Roadmap";

export default function Home() {
    // The empty array [] means this runs ONLY once when the page loads

    let superRoadmaps
    // const [roadmaps, setRoadmaps] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    type RoadmapType = {
        id: number;
        title: string;
    };

    useEffect(() => {
        // Define the async function inside the effect
        const loadRoadmaps = async () => {
            try {
                superRoadmaps = (await fetch("http://127.0.0.1:8000/")).json()
                setError(null);
            } catch (err) {
                console.error(err);
                // @ts-ignore
                setError("Failed to load roadmaps");
            } finally {
                setLoading(false);
            }
        };

      void loadRoadmaps();
    }, []);

    return (
        <div>
            {superRoadmaps.map((item) => (
                <Roadmap key={item.id} roadmap={item}/>
            ))}
        </div>
    );
}
