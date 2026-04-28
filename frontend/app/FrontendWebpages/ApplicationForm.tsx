import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {IndexFooter, IndexHeader} from './fragments/IndexHeaderAndFooter';
import {Button, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField} from "@heroui/react";
import {useParams} from "react-router";

export default function ApplicationForm() {
    const { id } = useParams();

    async function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log("job id is:", id);

        const res = await fetch(`http://localhost:8000/api/application/new/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                f_name: formData.get("f_name"),
                l_name: formData.get("l_name"),
                phone_number: formData.get("phone_number"),
                email: formData.get("email"),
                application_date: new Date().toISOString().split("T")[0],
                job_id: id,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed", res.status, errorText);
            return;
        }
        console.log("Application submitted!");
    }

    return (
        <>

            <div className="wrapper">
                <div align="center">
                    <Form method="post" className="w-full max-w-96" onSubmit={handleSubmit}>
                        <Fieldset>
                            <Description>Apply to Application!</Description>
                            <FieldGroup>
                                <TextField isRequired name="f_name" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                    <Label>First Name</Label>
                                    <Input placeholder="John" />
                                    <FieldError />
                                </TextField>
                                <TextField isRequired name="l_name" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                    <Label>Last Name</Label>
                                    <Input placeholder="Doe" />
                                    <FieldError />
                                </TextField>
                                <TextField isRequired name="phone_number" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                    <Label>Phone</Label>
                                    <Input placeholder="+201xxxxxxxxx" />
                                    <FieldError />
                                </TextField>
                                <TextField isRequired name="email" type="email">
                                    <Label>Email</Label>
                                    <Input placeholder="john@example.com" />
                                    <FieldError />
                                </TextField>
                            </FieldGroup>
                            <Fieldset.Actions>
                                <Button type="submit">Apply</Button>
                                <Button type="reset" variant="secondary">Reset</Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>
            </div>
          
        </>
    );
}
