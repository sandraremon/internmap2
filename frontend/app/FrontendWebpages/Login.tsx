import React, {useState} from "react";
import { useNavigate } from "react-router";
import {Alert, CloseButton, Spinner} from "@heroui/react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null as string | null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();
        setErrorMessage(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                setErrorMessage(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.access_token);
            navigate("/");

        } catch (error) {
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

            <form className="container" onSubmit={handleLogin}>

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
        Your Email &/or Password may be incorrect
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

                <label>Email:</label>
                <input
                    className="text-sm"
                    type="email"
                    value={email}
                    placeholder="Craig@Internmap.co"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br/><br/>

                <label>Password:</label>
                <input
                    className="text-sm"
                    type="password"
                    value={password}
                    placeholder="Anything"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />

                { loading ? <Spinner size="lg" color="current" /> : <><br /> <input className="text-lg" type="submit" value="Log In" /></>}

                <br />

                <p style={{ fontSize: "14px" }}>
                    Need to sign up first?{" "}
                    <a href="/signup" style={{ color: "rgb(49, 131, 254)", fontWeight: 600 }}>
                        Sign up
                    </a>
                </p>
                <br/>
            </form>
        </div>
    );
}
