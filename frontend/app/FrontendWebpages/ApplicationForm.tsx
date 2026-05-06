import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {Button, FieldError, FieldGroup, Fieldset, Form, Input, Label, Modal, TextField, type UseOverlayStateReturn} from "@heroui/react";

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
            <Modal isOpen={onApplicationState.isOpen}>
                <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="max-w-lg rounded-4xl">
                            <Modal.CloseTrigger onClick={() => onApplicationState.close()} />
                            <Modal.Header>
                                <Modal.Heading>Apply for position</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Form method="post" onSubmit={handleSubmit}>
                                    <Fieldset>
                                        <FieldGroup className="flex flex-col gap-3 pt-7">
                                            <div className="flex flex-row justify-between gap-5">
                                            <TextField className="full-width" isRequired name="f_name" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                                <Label>First Name</Label>
                                                <Input placeholder="John" />
                                                <FieldError />
                                            </TextField>
                                            <TextField className="full-width" isRequired name="l_name" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                                <Label>Last Name</Label>
                                                <Input placeholder="Doe" />
                                                <FieldError />
                                            </TextField>
                                            </div>
                                            <TextField isRequired name="email" type="email">
                                                <Label>Email</Label>
                                                <Input placeholder="john@example.com" />
                                                <FieldError />
                                            </TextField>
                                            <TextField isRequired name="phone_number" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                                <Label>Phone</Label>
                                                <Input placeholder="+201xxxxxxxxx" />
                                                <FieldError />
                                            </TextField>
                                        </FieldGroup>
                                        <Fieldset.Actions>
                                            <Button className="full-width p-4 font-bold rounded-4xl" style={{fontSize: "14px"}} type="submit" onClick={() => onApplicationState.close()} slot="close">Apply</Button>
                                        </Fieldset.Actions>
                                    </Fieldset>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}
