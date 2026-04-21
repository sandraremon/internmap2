import {useState} from "react";


export default async function Home() {
    const [roadmap, setRoadmap] = useState([])
    const[err,setError]=useState("")
    const[loading,setLoading]=useState(true)

    try {
        const response = await fetch("http://127.0.0.1:8000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({roadmap}),
        });

        const data = await response.json();
    }
    catch(err){
        console.error(err);
        setError("server error");
    }
    finally{
     setLoading(false)
    }


}
