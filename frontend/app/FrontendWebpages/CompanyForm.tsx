import React, { useState } from "react";
import { useNavigate } from "react-router";
import {Alert, CloseButton, Spinner} from "@heroui/react";

// @ts-ignore
export default function RegisterCompany() {
    //const [success, setSuccess] = useState("");
    //const [errors, setErrors] = useState([]);
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
            industry: formData.get("industry") as string,
            location_ofhq: formData.get("location_ofhq") as string,
            name: formData.get("name") as string,
            websiteurl: formData.get("websiteurl") as string,
        };
        try{
            const token = localStorage.getItem("token");
            const res = await fetch(
                "http://127.0.0.1:8000/company/register",
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
                setErrorMessage(data.message || "Regitration failed");
                return;
            }else{
                navigate("/");
            }
        }catch (error) {
            console.error(error);
            setErrorMessage("Server error or connection issue");
        } finally {
            setLoading(false);
        }



    }

    return (
        <div className="centered">
            <a href="/" style={{ borderRadius: "200px" }}>
                <img
                    src="/images/navi/Navi%20Unique.png"
                    alt="Logo"
                    style={{ width: "100px", height: "100px" }}
                />
            </a>
            <br/>

            <form className="container" onSubmit={handleSubmit}>

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
        Registration failed
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
                        <h1 className="font-bold text-3xl m-2" style={{paddingTop: "12px"}}>Sign in</h1>
                    </>
                )}

                <label>Company name:</label>
                <input
                    className="text-sm"
                    type="text"
                    name="name"
                    placeholder="eg.Orange"
                //    onChange={(e) => set(e.target.value)}
                    required
                />

                <br/>
                <br/>

                <label>industry:</label>
                <input
                    className="text-sm"
                    type="text"
                    placeholder="eg.tech"
                    name="industry"
                    //onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br/>

                <label>Location:</label>
                <input
                    className="text-sm"
                    type="text"
                    name="location_ofhq"
                    placeholder="eg.Cairo"
                    //onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br/>

                <label>Website:</label>
                <input
                    className="text-sm"
                    type="url"
                    name="websiteurl"
                    placeholder="eg.https:/orange.com"
                    //onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />


                { loading ? <Spinner size="lg" color="current" /> : <><br /> <input className="text-lg" type="submit" value="Register Company" /></>}

                <br />

                <br/>
            </form>
        </div>
    );
}
