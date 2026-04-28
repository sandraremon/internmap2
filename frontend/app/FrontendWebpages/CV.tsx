import React, { useState } from "react";
import { useNavigate } from "react-router";
import {Alert, CloseButton, Spinner} from "@heroui/react";

// @ts-ignore
export default function CreateCv() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null as string | null);


    // @ts-ignore
    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage(null);
        setLoading(true);


        const formData = new FormData(e.currentTarget);

        const payload = {
            description: formData.get("description") as string,
            past_experiences: formData.get("past_experiences") as string,
            projects: formData.get("projects") as string,
        };
        try{
            const token = localStorage.getItem("token");
            const res = await fetch(
                "http://127.0.0.1:8000/cv/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                setErrorMessage(data.message || "CV creation failed");
                return;
            }else{
                navigate("/profile");
            }
        }catch (error) {
            console.error(error);
            setErrorMessage("Server error or connection issue");
        } finally {
            setLoading(false);
        }



    }

    return (
        <div className='centered'>

                <a href="/" style={{ borderRadius: "200px" }}>
                    <img
                        src="/images/navi/Navi%20Unique.png"
                        alt="Logo"
                        style={{ width: "100px", height: "100px" }}
                    />
                </a>
            <br/>

            <form  onSubmit={handleSubmit}  >

                {errorMessage && (
                    <>
                        <br/>
                        <Alert className="dark rounded-4xl" style={{background: "var(--secondary-background-color)"}} status="danger">
                            <Alert.Indicator className="pr-0">
                                <img src="/images/assets/exclamationmark.circle.fill@4x.png" alt="Logo" style={{width: "20px", height: "20px"}}/>
                            </Alert.Indicator>
                            <Alert.Content>
                                <Alert.Title>
    <span className="font-bold" style={{marginTop: "2.2px", color: "rgb(225, 66, 69)"}}>
        failed to save cv
    </span>
                                </Alert.Title>
                            </Alert.Content>
                            <CloseButton style={{background: "var(--tertiary-background-color)", marginTop: "2.2px"}} onClick={() => setErrorMessage(null)} />
                        </Alert>
                        <br/>
                    </>
                )}

                {!errorMessage && (
                    <>
                        <h1 className="font-bold text-3xl m-2" style={{paddingTop: "12px"}}>make Cv</h1>
                    </>
                )}

                <label>description</label>
                <input
                    className="text-sm"
                    type="text"
                    name="description"
                    placeholder="About you"
                    //    onChange={(e) => set(e.target.value)}
                    required
                />

                <br/>
                <br/>

                <label>past experience:</label>
                <input
                    className="text-sm"
                    type="text"
                    placeholder=""
                    name="past_experiences"
                    //onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br/>

                <label>projects</label>
                <input
                    className="text-sm"
                    type="text"
                    name="projects"
                    placeholder=""
                    //onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                { loading ? <Spinner size="lg" color="current" /> : <><br /> <input className="text-lg" type="submit" value="create CV" /></>}

                <br />

                <br/>
            </form>
        </div>
    );
}
