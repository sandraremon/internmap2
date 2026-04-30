import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import { Button, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, Modal, TextField } from "@heroui/react";
import type { Selection } from "@heroui/react";
import { Dropdown, Header } from "@heroui/react";
import {useState} from "react";
import {useNavigate} from "react-router";

// @ts-ignore
export default function JobPostingModal({overlayState}: {overlayState: UseOverlayStateReturn}) {

    const [selected, setSelected] = useState<Set<string>>(new Set());

    const selectedValue = selected.values().next().value ?? "";
    const onJobPostingState = overlayState;
    const labels: Record<string, string> = {
        intern: "Internship",
        fulltime: "Full Time",
        freelance: "FreeLanceProject",
    };
    const navigate = useNavigate();

    async function handleSubmit(e: any) {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const typeMap: Record<string, string> = {
            intern: "Internship",
            fulltime: "FullTime",
            freelance: "FreeLanceProject",
        };

        const body = {
            type: typeMap[Array.from(selected)[0]],
            date_posted: new Date().toISOString().split("T")[0],
            job_name: formData.get("job_name"),
            job_description: formData.get("job_description"),
            job_requirements: formData.get("job_requirements"),
            duration: formData.get("duration"),
            job_location: formData.get("job_location"),
            benefits: formData.get("benefits"),
            payout: formData.get("payout"),
            company_name: formData.get("company"), // ← flat, not nested

        };

        const res = await fetch(`http://localhost:8000/api/jobposting/new`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log("testing");
        if (!res.ok) {
            const errorBody = await res.json(); // ← ADD THIS
            console.error("Submission failed:", res.status, errorBody);
        } else {
            const successBody = await res.json();
            console.log("Success:", successBody);
            navigate("/");
        }
    }
    console.log("selectedValue:", selectedValue);
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("token:", localStorage.getItem("token"));

    return (

        <>
            <Modal isOpen={onJobPostingState.isOpen}>
                <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90 rounded-4xl">
                            <Modal.CloseTrigger onClick={() => onJobPostingState.close()} />
                            <Modal.Header>
                                <img src="/images/navi/Navi%20Beta.png" alt="Logo" style={{height: "60px", width: "60px"}}/>
                                <Modal.Heading>Welcome to Internmap!</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Form method="post" className="w-full max-w-96" onSubmit={handleSubmit}>
                                    <Fieldset>
                                        <Description>Apply to Application!</Description>
                                        <FieldGroup>
                                            <Dropdown
                                                label="Job Type Selector"
                                                selectedKeys={selected}
                                                onSelectionChange={(keys) => {
                                                    if (keys === "all") return;
                                                    setSelected(new Set(Array.from(keys).map(String)));
                                                }}
                                            >
                                                <Button aria-label="Menu" variant="secondary">
                                                    {labels[selectedValue as string] ?? "Select job type"}
                                                </Button>
                                                <Dropdown.Popover className="min-w-[256px]">

                                                    <Dropdown.Menu
                                                        aria-label="Job type"
                                                        selectedKeys={selected}
                                                        selectionMode="single"
                                                        onSelectionChange={(keys) => {
                                                            if (keys === "all") return;
                                                            setSelected(new Set(Array.from(keys).map(String)));
                                                        }}
                                                    >
                                                        <Dropdown.Section>
                                                            <Header>Select a fruit</Header>
                                                            <Dropdown.Item id="intern" textValue="Internship">
                                                                <Dropdown.ItemIndicator />
                                                                <Label>Internship</Label>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item id="fulltime" textValue="fulltime">
                                                                <Dropdown.ItemIndicator />
                                                                <Label>fullTime</Label>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item id="freelance" textValue="freelance">
                                                                <Dropdown.ItemIndicator />
                                                                <Label>Freelance</Label>
                                                            </Dropdown.Item>
                                                        </Dropdown.Section>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown>
                                            <TextField
                                                isRequired
                                                name="job_name"
                                                validate={(value) => {
                                                    if (value.length < 3) {
                                                        return "Name must be at least 3 characters";
                                                    }
                                                    return null;
                                                }}>


                                                <Label>Job Title</Label>
                                                <Input placeholder="Professional pro player" />
                                                <FieldError />
                                            </TextField>

                                            <TextField
                                                isRequired
                                                name="job_description"
                                                validate={(value) => {
                                                    if (value.length < 3) {
                                                        return "Name must be at least 3 characters";
                                                    }
                                                    return null;
                                                }}>


                                                <Label>Job Description</Label>
                                                <Input placeholder="Have no life" />
                                                <FieldError />
                                            </TextField>
                                            <TextField
                                                isRequired
                                                name="job_requirements"
                                                validate={(value) => {
                                                    if (value.length < 3) {
                                                        return "Name must be at least 3 characters";
                                                    }
                                                    return null;
                                                }}>


                                                <Label>Job Requirement</Label>
                                                <Input placeholder="idk nothing" />
                                                <FieldError />
                                            </TextField>
                                            <TextField  name="company" type="text">
                                                <Label>Company Name</Label>
                                                <Input placeholder="RIOOOOOOOOOOOT" />
                                                <FieldError />
                                            </TextField>
                                            {/* Internship fields */}
                                            {selectedValue === "intern" && (
                                                <>
                                                    <TextField name="duration" type="text">
                                                        <Label>Duration:</Label>
                                                        <Input placeholder="e.g. 3 months" />
                                                    </TextField>
                                                    <TextField name="job_location" type="text">
                                                        <Label>Location:</Label>
                                                        <Input placeholder="Cairo" />
                                                    </TextField>
                                                </>
                                            )}
                                            {/* freelance fields */}
                                            {selectedValue === "freelance" && (
                                                <>
                                                    <TextField name="duration" type="text">
                                                        <Label>Duration:</Label>
                                                        <Input placeholder="3 months" />
                                                    </TextField>
                                                    <TextField name="job_location" type="text">
                                                        <Label>Location:</Label>
                                                        <Input placeholder="Cairo " />
                                                    </TextField>
                                                    <TextField name="payout" type="text">
                                                        <Label>Pay out:</Label>
                                                        <Input placeholder="3000" />
                                                    </TextField>
                                                </>
                                            )}

                                            {/* full time fields */}
                                            {selectedValue === "fulltime" && (
                                                <>
                                                    <TextField name="benefits" type="text">
                                                        <Label>Benefits:</Label>
                                                        <Input placeholder="providing insurance" />
                                                    </TextField>
                                                </>
                                            )}

                                        </FieldGroup>
                                        <Fieldset.Actions>
                                            <Button type="submit">
                                                add

                                            </Button>
                                            <Button type="reset" variant="secondary">
                                                Reset
                                            </Button>
                                        </Fieldset.Actions>
                                    </Fieldset>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                {/*<Button className="w-full" onClick={() => closeOnboarding() } slot="close">*/}
                                {/*    Continue*/}
                                {/*</Button>*/}
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}
