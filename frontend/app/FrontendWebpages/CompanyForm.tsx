import React, { useState } from "react";
import { useNavigate } from "react-router";
import {IndexFooter, IndexHeader} from "~/FrontendWebpages/fragments/IndexHeaderAndFooter";
import {Button, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField} from "@heroui/react";

// @ts-ignore
export default function RegisterCompany({company}) {
    const [form, setForm] = useState({
        name: "",
        industry: "",
        website_url: "",
        location_hq: "",
    });
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null as string | null);


    // @ts-ignore
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams({

            industry: formData.get("industry") as string,
            location_ofhq: formData.get("location_ofhq") as string,
            name: formData.get("name") as string,
            websiteurl: formData.get("website") as string,
        });
        const res = await fetch(
            "http://127.0.0.1:8000/company/register",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

    }

    return (
        // <div className="form-container">
        //     <h2 className="form-title">Create a Company</h2>
        //
        //     {success && (
        //         <div style={{ color: "#155724", background: "#d4edda", border: "1px solid #c3e6cb", padding: "12px", marginBottom: "20px", borderRadius: "8px" }}>
        //             {success}
        //         </div>
        //     )}
        //
        //     {errors.length > 0 && (
        //         <div style={{ color: "#721c24", background: "#f8d7da", border: "1px solid #f5c6cb", padding: "12px", marginBottom: "20px", borderRadius: "8px" }}>
        //             <ul style={{ margin: 0, paddingLeft: "16px" }}>
        //                 {errors.map((err, i) => <li key={i}>{err}</li>)}
        //             </ul>
        //         </div>
        //     )}
        //
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-row">
        //             <div className="form-group">
        //                 <input
        //                     type="text"
        //                     name="name"
        //                     className="form-input"
        //                     value={form.name}
        //                     placeholder="Company Name"
        //                     required
        //                 />
        //             </div>
        //             <div className="form-group">
        //                 <input
        //                     type="text"
        //                     name="industry"
        //                     className="form-input"
        //                     value={form.industry}
        //                     placeholder="Industry"
        //                 />
        //             </div>
        //             <div className="form-group">
        //                 <input
        //                     type="url"
        //                     name="website_url"
        //                     className="form-input"
        //                     value={form.website_url}
        //                     placeholder="Company's website"
        //                 />
        //             </div>
        //             <div className="form-group">
        //                 <input
        //                     type="text"
        //                     name="location_hq"
        //                     className="form-input"
        //                     value={form.location_hq}
        //                     placeholder="Office address"
        //                 />
        //             </div>
        //         </div>
        //
        //         <button type="submit" className="form-submit">
        //             Create Company
        //         </button>
        //     </form>
        //
        //     <p className="form-link">
        //         Already registered your company?{" "}
        //         <a href="/recruiter/register">Back to recruiter registration</a>
        //     </p>
        // </div>
        <>
            <IndexHeader/>
            <div className="wrapper">
                <div  align="center" >

                    <Form method="post" className="w-full max-w-96" onSubmit={handleSubmit}>
                        {/*<input*/}
                        {/*    type="hidden"*/}
                        {/*    name="jobId"*/}
                        {/*    value={new URL(window.location.href).searchParams.get("jobId") ?? ""}*/}
                        {/*/>*/}
                        <Fieldset>
                            <Description>Add company</Description>
                            <FieldGroup>
                                <TextField
                                    isRequired
                                    name="industry"
                                    validate={(value) => {
                                        if (value.length < 3) {
                                            return "Name must be at least 3 characters";
                                        }
                                        return null;
                                    }}>


                                    <Label>industry</Label>
                                    <Input placeholder="eg. tech" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    isRequired
                                    name="location_ofhq"
                                    validate={(value) => {
                                        if (value.length < 3) {
                                            return "Name must be at least 3 characters";
                                        }
                                        return null;
                                    }}>

                                    <Label>location</Label>
                                    <Input placeholder="cairo" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    isRequired
                                    name="name"
                                    validate={(value) => {
                                        if (value.length < 3) {
                                            return "Name must be at least 3 characters";
                                        }
                                        return null;
                                    }}>


                                    <Label>company name:</Label>
                                    <Input placeholder="eg. apple " />
                                    <FieldError />
                                </TextField>
                                <TextField isRequired name="website">
                                    <Label>website</Label>
                                    <Input placeholder="www.apple.com" />
                                    <FieldError />
                                </TextField>

                            </FieldGroup>
                            <Fieldset.Actions>
                                <Button type="submit" onSubmit={handleSubmit} >
                                    Create Company

                                </Button>
                                {/*<Button type="reset" variant="secondary">*/}
                                {/*    Reset*/}
                                {/*</Button>*/}
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>
            </div>

            <IndexFooter/>
        </>
    );
}
