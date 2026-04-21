const BASE_URL = "http://127.0.0.1:8000/Roadmap";

export const getRoadmaps = async()=> {
    //fetch is a function you can use to send a request to
    //network request
    const response= await fetch("http://127.0.0.1:8000/");
    const data= await response.json()
    console.log("API RESPONSE:", data);
    return data
}

