import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function RecruiterRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
// @ts-ignore
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);

        // Gathering data from Pure HTML inputs
        const payload = {
            f_name: formData.get("f_name") as string,
            l_name: formData.get("l_name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            title: formData.get("title") as string,
        };

        try {
            // Replace with your actual testing endpoint
            const res = await fetch("http://127.0.0.1:8000/api/recruiter/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",

                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                // On success, go to login or the next step
                localStorage.setItem("token", data.token);
                navigate("/company/register");
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.detail || "Registration failed.");
                console.log(data);
            }
        } catch (error) {
            setErrorMessage("Server connection error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif" }}>
                <h1 style={{ textAlign: "center", color: "#333" }}>Recruiter Registration</h1>
                <p style={{ textAlign: "center", color: "#666" }}>Create your account to start hiring</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                    {errorMessage && (
                        <div style={{ color: "white", backgroundColor: "#d9534f", padding: "10px", borderRadius: "4px" }}>
                            {errorMessage}
                        </div>
                    )}

                    {/* First and Last Name (Side by Side) */}


                    <div>
                        <label htmlFor="f_name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>F name</label>
                        <input type="text" id="f_name" name="f_name" required placeholder="." style={inputStyle} />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="l_name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>L name</label>
                        <input type="text" id="l_name" name="l_name" required placeholder="." style={inputStyle} />
                    </div>

                    {/* Job Title */}
                    <div>
                        <label htmlFor="title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Job Title</label>
                        <input type="text" id="title" name="title" required placeholder="HR Manager / Tech Lead" style={inputStyle} />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Work Email</label>
                        <input type="email" id="email" name="email" required placeholder="john@company.com" style={inputStyle} />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password</label>
                        <input type="password" id="password" name="password" required placeholder="••••••••" style={inputStyle} />
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "12px",
                            backgroundColor: loading ? "#ccc" : "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginTop: "10px"
                        }}
                    >
                        {loading ? "Processing..." : "Register as Recruiter"}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                    Already have an account? <a href="/login" style={{ color: "#007bff" }}>Log in</a>
                </p>
            </div>
        </>
    );
}

// Shared style for inputs to keep the JSX clean
const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const // Ensures padding doesn't break the width
};
