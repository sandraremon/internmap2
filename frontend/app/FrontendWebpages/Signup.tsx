import {Alert, CloseButton, Tabs} from "@heroui/react";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Signup() {
    const [errorMessage, setErrorMessage] = useState(null as string | null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        setErrorMessage(null);
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    // No Content-Type — browser sets multipart/form-data automatically
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || "Registration failed");
                return;
            }

            localStorage.setItem("token", data.access_token);
            navigate("/login");

        } catch (error) {
            console.error(error);
            setErrorMessage("Server error or connection issue");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="centered">
            <a href={"/"} style={{borderRadius: "200px"}} inert>
                <img src="/images/navi/Navi%20Unique.png" alt="Logo" width="100px" height="100px"/>
            </a>
            <br/>

            <div className="container">
                {errorMessage && (
                    <>
                        <br/>
                        <Alert className="dark rounded-4xl" style={{background: "var(--container-secondary)"}} status="danger">
                            <Alert.Indicator>
                                <img src="/images/assets/exclamationmark.circle.fill@4x.png" alt="Logo" style={{width: "20px", height: "20px", aspectRatio: "1/1"}}/>
                            </Alert.Indicator>
                            <Alert.Content>
                                <Alert.Title>
                                    <p className="font-bold" style={{marginTop: "2.2px", color: "rgb(225, 66, 69)"}}>
                                        {errorMessage}
                                    </p>
                                </Alert.Title>
                            </Alert.Content>
                            <CloseButton style={{background: "var(--component-tertiary)", marginTop: "2.2px"}} onClick={() => setErrorMessage(null)} />
                        </Alert>
                    </>
                )}

                {!errorMessage && (
                    <h1 className="font-bold text-3xl" style={{paddingTop: "25px"}}>Sign Up</h1>
                )}

                <br/><br/>
                <Tabs className="full-width" style={{margin: "-20px"}} defaultSelectedKey={"student"}>
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="selection control">
                            <Tabs.Tab id="admin">Admin<Tabs.Indicator /></Tabs.Tab>
                            <Tabs.Tab id="student">Student<Tabs.Indicator /></Tabs.Tab>
                            <Tabs.Tab id="recruiter">Recruiter<Tabs.Indicator /></Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>

                    <br/>

                    {/* ADMIN */}
                    <Tabs.Panel id="admin" style={{padding: 0}}>
                        <form className="full-width" onSubmit={(e) => handleRegister(e, "http://127.0.0.1:8000/api/admin/register")} method="post">

                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <label htmlFor="admin-first-name">First Name:</label>
                                <label htmlFor="admin-last-name">Last Name:</label>
                            </div>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <input type="text" id="admin-first-name" className="text-sm" name="f_name" placeholder="First name" required autoComplete="given-name"/>
                                <input type="text" id="admin-last-name" className="text-sm" name="l_name" placeholder="Last name" required autoComplete="family-name"/>
                            </div>
                            <br/><br/>

                            <label htmlFor="admin-email">Email:</label>
                            <input type="email" id="admin-email" className="text-sm" name="email" placeholder="Email" required autoComplete="email"/>
                            <br/><br/>

                            <label htmlFor="admin-password">Password:</label>
                            <input type="password" id="admin-password" className="text-sm" name="password" placeholder="Password" required autoComplete="new-password"/>
                            <br/><br/>
                            <label htmlFor="admin-permission_level">Permission level:</label>
                            <input type="number" id="admin-permission_level" className="text-sm" name="permission_level" placeholder="permission level"  autoComplete="permission level"/>
                            <br/><br/>

                            <label htmlFor="admin-profile-pic">Profile Picture:</label>
                            <input type="file" id="admin-profile-pic" name="profile_pic" accept="image/*" />
                            <br/><br/>

                            <input type="submit" className="form-submit" value={loading ? "Creating..." : "Create Account"} disabled={loading}/>
                        </form>
                    </Tabs.Panel>

                    {/* STUDENT */}
                    <Tabs.Panel id="student" style={{padding: 0}}>
                        <form className="full-width" onSubmit={(e) => handleRegister(e, "http://127.0.0.1:8000/api/student/register")} method="post">

                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <label htmlFor="student-first-name">First Name:</label>
                                <label htmlFor="student-last-name">Last Name:</label>
                            </div>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <input className="text-sm" type="text" id="student-first-name" name="f_name" placeholder="Intern" required autoComplete="given-name"/>
                                <input className="text-sm" type="text" id="student-last-name" name="l_name" placeholder="Map" required autoComplete="family-name"/>
                            </div>
                            <br/><br/>

                            <label htmlFor="student-email">Email:</label>
                            <input className="text-sm" type="email" id="student-email" name="email" placeholder="Email" required autoComplete="email"/>
                            <br/><br/>

                            <label htmlFor="student-password">Password:</label>
                            <input className="text-sm" type="password" id="student-password" name="password" placeholder="Password" required autoComplete="new-password"/>
                            <br/><br/>

                            <label htmlFor="graduating-year">Graduating Year:</label>
                            <input className="text-sm" type="text" id="graduating-year" name="graduating_year" placeholder="2094" required/>
                            <br/><br/>

                            <label htmlFor="university">University:</label>
                            <input className="text-sm" type="text" id="university" name="uni_name" placeholder="Harvard" required/>
                            <br/><br/>

                            <label htmlFor="major">Major:</label>
                            <input className="text-sm" type="text" id="major" name="student_major" placeholder="Major" required/>
                            <br/><br/>

                            <label htmlFor="faculty">Faculty:</label>
                            <input className="text-sm" type="text" id="faculty" name="faculty" placeholder="Arts & Design" required/>
                            <br/><br/>

                            <label htmlFor="student-profile-pic">Profile Picture:</label>
                            <input type="file" id="student-profile-pic" name="profile_pic" accept="image/*" />
                            <br/><br/>

                            <input type="submit" className="form-submit" value={loading ? "Creating..." : "Create Account"} disabled={loading}/>
                        </form>
                    </Tabs.Panel>

                    {/* RECRUITER */}
                    <Tabs.Panel id="recruiter" style={{padding: 0}}>
                        <form className="full-width" onSubmit={(e) => handleRegister(e, "http://127.0.0.1:8000/api/recruiter/register")} method="post">

                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <label htmlFor="recruiter-first-name">First Name:</label>
                                <label htmlFor="recruiter-last-name">Last Name:</label>
                            </div>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                                <input className="text-sm" type="text" id="recruiter-first-name" name="f_name" placeholder="Intern" required autoComplete="given-name"/>
                                <input className="text-sm" type="text" id="recruiter-last-name" name="l_name" placeholder="Map" required autoComplete="family-name"/>
                            </div>
                            <br/><br/>

                            <label htmlFor="recruiter-email">Email:</label>
                            <input className="text-sm" type="email" id="recruiter-email" name="email" placeholder="example@intern.com" required autoComplete="email"/>
                            <br/><br/>

                            <label htmlFor="recruiter-password">Password:</label>
                            <input className="text-sm" type="password" id="recruiter-password" name="password" placeholder="Enter your password" required autoComplete="new-password"/>
                            <br/><br/>

                            <label htmlFor="title">Job Title:</label>
                            <input className="text-sm" type="text" id="title" name="title" placeholder="Chief Executive Officer" required/>
                            <br/><br/>

                            <label htmlFor="company-name">Company's Name:</label>
                            <input className="text-sm" type="text" id="company-name" name="company_name" placeholder="InternMap"/>
                            <br/><br/>

                            <label htmlFor="recruiter-profile-pic">Profile Picture:</label>
                            <input type="file" id="recruiter-profile-pic" name="profile_pic" accept="image/*" />
                            <br/><br/>

                            <input type="submit" className="form-submit" value={loading ? "Creating..." : "Create Account"} disabled={loading}/>
                        </form>
                    </Tabs.Panel>


                </Tabs>

                <br/><br/>
                <p style={{justifySelf: "center", alignSelf: "center", fontSize: "14px", fontWeight: 400}}>
                    Already have an account? <a style={{color: "rgb(49, 131, 254)", fontWeight: 600, borderRadius: "200px", textDecoration: "none"}} href={"/login"}>Sign in</a>
                </p>
                <br/>
            </div>
        </div>
    );
}
