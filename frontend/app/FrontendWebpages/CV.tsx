import React, { useState } from "react";
import { useNavigate } from "react-router";
import {Alert, Button, CloseButton, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, Modal, TextField} from "@heroui/react";

// @ts-ignore
export default function CVForm({overlayState}: {overlayState: UseOverlayStateReturn}) {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null as string | null);
    const onCVState = overlayState;

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
            } else {
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
        <Modal isOpen={onCVState.isOpen}>
            <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                <Modal.Container>
                    <Modal.Dialog className="max-w-lg rounded-4xl">
                        <Modal.CloseTrigger onClick={() => onCVState.close()} />
                        <Modal.Header>
                            <Modal.Heading>Compose a CV</Modal.Heading>
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
                                                Failed to save your CV
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
                        </Modal.Header>
                        <Modal.Body>
                            <Form method="post" className="w-full" onSubmit={handleSubmit}>
                                <Fieldset>
                                    <FieldGroup>
                                        <TextField isRequired name="description" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                            <Label>About</Label>
                                            <Input placeholder="ex. Laravel & PHP expert" />
                                            <FieldError />
                                        </TextField>
                                        <TextField isRequired name="past_experiences" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                            <Label>Your past experiences</Label>
                                            <Input placeholder="Worked on..." />
                                            <FieldError />
                                        </TextField>
                                        <TextField isRequired name="projects" validate={(v) => v.length < 3 ? "Min 3 characters" : null}>
                                            <Label>Your projects</Label>
                                            <Input placeholder="Made InternMap" />
                                            <FieldError />
                                        </TextField>
                                        <TextField isRequired name="email" type="email">
                                            <Label>Email</Label>
                                            <Input placeholder="benjamin@internmap.com" />
                                            <FieldError />
                                        </TextField>
                                    </FieldGroup>
                                    <Fieldset.Actions>
                                        <Button className="full-width p-4 font-bold rounded-4xl" type="submit" onClick={() => onCVState.close()} slot="close">Save</Button>
                                    </Fieldset.Actions>
                                </Fieldset>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
