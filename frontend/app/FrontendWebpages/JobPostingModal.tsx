import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {IndexFooter, IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label, Modal,
    TextField, useOverlayState
} from "@heroui/react";
import type {Selection} from "@heroui/react";
import { Dropdown, Header   } from "@heroui/react";
import {useState} from "react";
// @ts-ignore
export default function JobPostingModal({isActive}: {isActive: boolean}) {

    const [selected, setSelected] = useState<Selection>(new Set([""]));
    const onJobPostingState = useOverlayState({
        defaultOpen: isActive,
    })


    if ((localStorage.getItem("showJobPosting") == null || localStorage.getItem("showJobPosting") == "true") && !onJobPostingState.isOpen) {
        onJobPostingState.open()
    }

    function closeOnboarding() {
        localStorage.setItem("showJobPosting", "false");
        onJobPostingState.close()
    }
    async function handleSubmit(e) {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            jobType: Array.from(selected)[0],
            jobPosting: {
                job_name: formData.get("job_name"),
                job_description: formData.get("job_description"),
                job_requirements: formData.get("job_requirements"),
            },
            company: {
                name: formData.get("company"),
            }
        };

        try {
            const res = await fetch(`http://localhost:8000/api/jobposting/new`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                },
            });
            console.log("testing")
            if (!res.ok) console.error( "Submission failed:", res.status);
        } catch (err) {
            console.error("Network error:", err);
        }
    }


        return (

        <>
                    <Modal isOpen={onJobPostingState.isOpen}>
                        <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                            <Modal.Container>
                                <Modal.Dialog className="sm:max-w-90 rounded-4xl">
                                    <Modal.CloseTrigger onClick={() => closeOnboarding()} />
                                    <Modal.Header>
                                        <img src="/images/navi/Navi%20Beta.png" alt="Logo" style={{height: "60px", width: "60px"}}/>
                                        <Modal.Heading>Welcome to Internmap!</Modal.Heading>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form method="post" className="w-full max-w-96" onSubmit={handleSubmit}>
                                            <Fieldset>
                                                <Description>Apply to Application!</Description>
                                                <FieldGroup>
                                                    <Dropdown style>
                                                        <Button aria-label="Menu" variant="secondary">
                                                            InternShip
                                                        </Button>
                                                        <Dropdown.Popover className="min-w-[256px]">
                                                            <Dropdown.Menu
                                                                selectedKeys={selected}
                                                                selectionMode="single"
                                                                onSelectionChange={setSelected}
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
                                                                    <Dropdown.Item id="Freelance" textValue="Freelance">
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


                                                        <Label>Job Discription</Label>
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
                                                    <TextField isRequired name="company" type="text">
                                                        <Label>Company Name</Label>
                                                        <Input placeholder="RIOOOOOOOOOOOT" />
                                                        <FieldError />
                                                    </TextField>

                                                </FieldGroup>
                                                <Fieldset.Actions>
                                                    <Button type="submit" onSubmit={handleSubmit} >
                                                        Apply

                                                    </Button>
                                                    <Button type="reset" variant="secondary">
                                                        Reset
                                                    </Button>
                                                </Fieldset.Actions>
                                            </Fieldset>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className="w-full" onClick={() => closeOnboarding() } slot="close">
                                            Continue
                                        </Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>
        </>
    );
}
