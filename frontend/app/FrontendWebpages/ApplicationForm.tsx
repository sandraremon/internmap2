import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {IndexFooter, IndexHeader} from './fragments/IndexHeaderAndFooter';
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    Modal,
    TextField, type UseOverlayStateReturn
} from "@heroui/react";
import {useParams} from "react-router";

export default function ApplicationForm({overlayState, jobId}: {overlayState: UseOverlayStateReturn ,jobId: number | null}) {

    const onApplicationState = overlayState;


    async function handleSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);


        const res = await fetch(`http://localhost:8000/api/application/new/${jobId}`, {
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
                job_id:  jobId,
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
<br/><br/><br/><br/><br/><br/>
            <div className="wrapper">
                <div align="center">
                    <Modal isOpen={onApplicationState.isOpen}>
                        <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                            <Modal.Container>
                                <Modal.Dialog className="sm:max-w-90 rounded-4xl">
                                    <Modal.CloseTrigger onClick={() => onApplicationState.close()} />
                                    <Modal.Header>
                                        <img src="/images/navi/Navi%20Beta.png" alt="Logo" style={{height: "60px", width: "60px"}}/>
                                        <Modal.Heading>Welcome to Internmap!</Modal.Heading>
                                    </Modal.Header>
                                    <Modal.Body>
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
                                                    <Button type="submit" onClick={() => onApplicationState.close()} slot="close">Apply</Button>
                                                    <Button type="reset" variant="secondary">Reset</Button>
                                                </Fieldset.Actions>
                                            </Fieldset>
                                        </Form>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>

                </div>
            </div>

        </>
    );
}
