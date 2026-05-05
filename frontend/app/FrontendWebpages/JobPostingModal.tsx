import "../CSS/Universal.css"
import {
    Alert,
    Button,
    CloseButton,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    Modal,
    TextField
} from "@heroui/react";
import { Dropdown } from "@heroui/react";
import React, {useState} from "react";
import {useNavigate} from "react-router";

// @ts-ignore
export default function JobPostingModal({overlayState}: {overlayState: UseOverlayStateReturn}) {

    const [selected, setSelected] = useState<Set<string>>(new Set());

    const selectedValue = selected.values().next().value ?? "";
    const onJobPostingState = overlayState;
    const labels: Record<string, string> = {
        intern: "Internship",
        fulltime: "Full Time",
        freelance: "Freelance Project",
    };
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null as string | null);

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
            const errorBody = await res.json();
            setErrorMessage(errorBody.error);
            console.error("Submission failed:", res.status, errorBody);
        } else {
            const successBody = await res.json();
            console.log("Success:", successBody);
            navigate("/");
        }
    }

    console.log("selectedValue:", selectedValue);

    return (

        <>
            <Modal isOpen={onJobPostingState.isOpen}>
                <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="max-w-xl">
                            <Modal.CloseTrigger style={{height: "35px", width: "35px", borderRadius: "80px"}} onClick={() => onJobPostingState.close()} />
                            <Modal.Header>
                                <Modal.Heading className="text-2xl font-bold">Compose a Job</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="space-y-4" style={{paddingTop: "20px"}}>
                                {errorMessage && (
                                    <>
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
                                        <br/>
                                    </>
                                )}

                                <Form method="post" className="w-full" onSubmit={handleSubmit}>
                                    <Fieldset>
                                        <FieldGroup>
                                            <div className="flex flex-row gap-5 items-start">
                                            <TextField
                                                className="full-width"
                                                isRequired
                                                name="job_name"
                                                validate={(value) => {
                                                    if (value.length < 3) {
                                                        return "Name must be at least 3 characters";
                                                    }
                                                    return null;
                                                }}>

                                                <Label>Job Title</Label>
                                                <Input placeholder="ex. Software Engineer" />
                                                <FieldError />
                                            </TextField>

                                                <div className="flex flex-col gap-1 full-width items-center">
                                                    <label className="label-small" style={{fontSize: "14px", fontWeight: 500}}>Type</label>
                                                    <Dropdown>
                                                        <Button className="flex full-width items-start p-3.5" style={{background: "var(--component-secondary)", marginBottom: "25px", color: "var(--text-primary)"}} variant="ghost">
                                                            <div className="flex w-full items-center justify-between gap-2.5 pl-2">
                                                                {labels[selectedValue as string] ?? "Job Type"}
                                                                <img className="icon" src="/images/assets/chevron@4x.png" alt="chevron" style={{width: "10px", marginRight: "10px"}}/>
                                                            </div>
                                                        </Button>
                                                        <Dropdown.Popover className="min-w-[256px]">
                                                            <Dropdown.Menu
                                                                aria-label="Job type"
                                                                selectedKeys={selected}
                                                                defaultSelectedKeys={selected}
                                                                selectionMode="single"
                                                                onSelectionChange={(keys) => {
                                                                    if (keys === "all") return;
                                                                    setSelected(new Set(Array.from(keys).map(String)));
                                                                }}>
                                                                <Dropdown.Section>
                                                                    <Dropdown.Item id="intern" textValue="Internship">
                                                                        <h1 style={{color: "var(--text-primary)"}} className="label-small font-semibold">Internship</h1>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item id="fulltime" textValue="fulltime">
                                                                        <h1 style={{color: "var(--text-primary)"}} className="font-semibold label-small">Full time</h1>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item id="freelance" textValue="freelance">
                                                                        <h1 style={{color: "var(--text-primary)"}} className="font-semibold label-small">Freelance</h1>
                                                                    </Dropdown.Item>
                                                                </Dropdown.Section>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Popover>
                                                    </Dropdown>
                                                </div>
                                            </div>

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
                                                <Input placeholder="Create wonderful things" />
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


                                                <Label>Job Requirements</Label>
                                                <Input placeholder="2 Years experience with Laravel" />
                                                <FieldError />
                                            </TextField>
                                            <TextField  name="company" type="text">
                                                <Label>Company Name</Label>
                                                <Input placeholder="InternMap" />
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
                                                        <Input placeholder="Remote, 123 street, etc." />
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
                                                        <Input placeholder="Cairo" />
                                                    </TextField>
                                                    <TextField name="payout" type="text">
                                                        <Label>Payout:</Label>
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
                                        <Fieldset.Actions style={{marginTop: "20px"}}>
                                            <Button className="full-width p-3 font-semibold" type="submit" onClick={() => setErrorMessage(null)}>Compose</Button>
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
