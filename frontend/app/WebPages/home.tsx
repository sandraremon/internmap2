import { useState, useEffect } from "react";
import {getRoadmaps} from "~/services/api";
import Roadmap from "../components/Roadmap";

function Home() {
    // The empty array [] means this runs ONLY once when the page loads

    const [roadmaps, setRoadmaps] = useState<RoadmapType[]>([]);
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
                const roadmaps = await getRoadmaps();
                setRoadmaps(roadmaps);
                setError(null);
            } catch (err) {
                console.error(err);
                // @ts-ignore
                setError("Failed to load roadmaps");
            } finally {
                setLoading(false);
            }
        };

      void  loadRoadmaps();
    }, []);




    return (
        <div>
            {roadmaps.map((item) => (
                <Roadmap key={item.id} roadmap={item}/>
            ))}

        </div>
    );



}

export default Home
