import "../CSS/jobPosting.css";
import "../CSS/InternMapHomepage.css";
import { useEffect, useState } from "react";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form, IconPlus,
    Input,
    Label,
    Modal,
    TextField,
    type UseOverlayStateReturn,
} from "@heroui/react";

// pass roadmapId as prop
export default function RoadMapEdit({overlayState,roadmapId}: {overlayState:UseOverlayStateReturn, roadmapId: number|null}) {
    const [title, setTitle] = useState("");
    const [modules, setModules] = useState([]);
    const onRoadmapState = overlayState;

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
            if (!roadmapId) return;
        async function fetchRoadmap() {
            const res = await fetch(`/api/roadmap/${roadmapId}/`);
            const data = await res.json();

            setTitle(data.name);
            setModules(data.modules || []);
        }

        fetchRoadmap();
    }, [roadmapId]);

    // ================= MODULE =================

    function addModule() {
        setModules([...modules, { name: "", description: "", skills: [] }]);
    }

    function removeModule(moduleIndex: any) {
        const updated = modules.map((mod, i) =>
            i === moduleIndex ? { ...mod, _deleted: true } : mod
        );
        setModules(updated);
    }

    function updateModuleField(moduleIndex: any, field: any, value: any) {
        const updated = modules.map((mod, i): any =>
            i === moduleIndex ? { ...mod, [field]: value } : mod
        );
        setModules(updated);
    }

    // ================= SKILL =================

    function addSkill(moduleIndex: any) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return {
                ...mod,
                skills: [...(mod.skills || []), { name: "", description: "", links: [""] }],
            };
        });
        setModules(updated);
    }

    function removeSkill(moduleIndex: any, skillIndex: any) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;

            const newSkills = mod.skills.map((skill: any, si: any) =>
                si === skillIndex ? { ...skill, _deleted: true } : skill
            );

            return { ...mod, skills: newSkills };
        });

        setModules(updated);
    }

    function updateSkillField(moduleIndex: any, skillIndex: any, field: any, value: any) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;

            const newSkills = mod.skills.map((skill: any, si: any) =>
                si === skillIndex ? { ...skill, [field]: value } : skill
            );

            return { ...mod, skills: newSkills };
        });

        setModules(updated);
    }

    // ================= SUBMIT =================

    async function handleSubmit(e: any) {
        e.preventDefault();
        const token = localStorage.getItem("token"); // ✅ FIX
        const body = {
            name: title,
            modules: modules.map((mod) => ({
                id: mod.id,
                name: mod.name,
                description: mod.description,
                _deleted: mod._deleted || false,
                skills: (mod.skills || []).map((skill: any) => ({
                    id: skill.id,
                    name: skill.name,
                    description: skill.description,
                    links: skill.links || [""],
                    _deleted: skill._deleted || false,
                })),
            })),
        };

        console.log("UPDATE BODY:", body);

        const res = await fetch(`http://localhost:8000/api/roadmap/${roadmapId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Accept": "application/json", // ✅ CRITICAL FIX
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(body),
        });
        console.log(localStorage.getItem("token"));

        if (!res.ok) {
            console.error("Update failed", await res.text());
            return;
        }

        console.log("Roadmap updated successfully!");
    }

    // ================= UI =================

    return (
        <>
            <Modal isOpen={onRoadmapState.isOpen}>
                <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="max-w-7xl rounded-4xl">
                            <Modal.CloseTrigger onClick={() => onRoadmapState.close()} />
                            <Modal.Header>
                                <Modal.Heading>Edit "{title}" </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="p-10">
                                    <Form className="flex rounded-4xl" method="post" onSubmit={handleSubmit}>
                                        <Fieldset>
                                            <FieldGroup>
                                                <TextField
                                                    isRequired
                                                    name="title"
                                                    validate={(value) => {
                                                        if (value.length < 3) return "Name must be at least 3 characters";
                                                        return null;
                                                    }}>
                                                    <Label style={{ fontSize: "20px"}}>Title</Label>
                                                    <Input
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                    <FieldError />
                                                </TextField>

                                                {/* MODULES */}
                                                {modules.filter((mod) => !mod._deleted).map((mod, moduleIndex) => (
                                                    <>
                                                    <br/><br/>
                                                        <div key={moduleIndex}>
                                                            <div className="flex items-center justify-between">
                                                                <h1 className="font-bold text-2xl">Module {moduleIndex + 1}</h1>
                                                                <div className="flex gap-3">
                                                                    <Button type="button" onPress={() => addSkill(moduleIndex)} variant="tertiary" isIconOnly>
                                                                        <IconPlus/>
                                                                    </Button>

                                                                    {moduleIndex > 0 && (
                                                                        <Button type="button" onPress={() => removeModule(moduleIndex)} variant="danger-soft">
                                                                            Remove
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <br/>

                                                            <TextField
                                                                isRequired
                                                                name={`modules[${moduleIndex}].name`}
                                                                validate={(value) => {
                                                                    if (value.length < 3) return "Name must be at least 3 characters";
                                                                    return null;
                                                                }}>
                                                                <Label>Name</Label>
                                                                <Input
                                                                    value={mod.name || ""}
                                                                    onChange={(e) =>
                                                                        updateModuleField(moduleIndex, "name", e.target.value)
                                                                    }
                                                                />
                                                                <FieldError />
                                                            </TextField>
                                                            <br />

                                                            <TextField
                                                                isRequired
                                                                name={`modules[${moduleIndex}].description`}
                                                                validate={(value) => {
                                                                    if (value.length < 3) return "Name must be at least 3 characters";
                                                                    return null;
                                                                }}>
                                                                <Label>Description</Label>
                                                                <Input
                                                                    value={mod.description || ""}
                                                                    onChange={(e) =>
                                                                        updateModuleField(moduleIndex, "description", e.target.value)
                                                                    }
                                                                />
                                                                <FieldError />
                                                            </TextField>
                                                            <br></br>

                                                            {/* SKILLS */}
                                                            <div className="gap-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}}>
                                                            {(mod.skills || []).filter((s) => !s._deleted).map((skill, skillIndex) => (
                                                                    <div className="skill-card" key={skillIndex}>
                                                                        <div className="flex justify-between h-10">
                                                                            <span className="font-bold">Skill {skillIndex + 1}</span>

                                                                            {skillIndex > 0 && (
                                                                                <Button type="button" onPress={() => removeSkill(moduleIndex, skillIndex)} variant="danger-soft">
                                                                                    Remove
                                                                                </Button>
                                                                            )}
                                                                        </div>

                                                                        <TextField
                                                                            isRequired
                                                                            name={`modules[${moduleIndex}].skills[${skillIndex}].name`}
                                                                            validate={(value) => {
                                                                                if (value.length < 3) return "Name must be at least 3 characters";
                                                                                return null;
                                                                            }}>
                                                                            <Label>Skill Name</Label>
                                                                            <Input
                                                                                value={skill.name || ""}
                                                                                onChange={(e) =>
                                                                                    updateSkillField(
                                                                                        moduleIndex,
                                                                                        skillIndex,
                                                                                        "name",
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                            <FieldError />
                                                                        </TextField>

                                                                        <br/>

                                                                        <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].description`} type="text">
                                                                            <Label>Skill Description</Label>
                                                                            <Input
                                                                                value={skill.description || ""}
                                                                                onChange={(e) =>
                                                                                    updateSkillField(
                                                                                        moduleIndex,
                                                                                        skillIndex,
                                                                                        "description",
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                            <FieldError />
                                                                        </TextField>

                                                                        <br/>
                                                                        <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].links[0]`} type="text">
                                                                            <Label>Resource Link</Label>
                                                                            <Input
                                                                                value={skill.links?.[0] || ""}
                                                                                placeholder="https://InternMap.com"
                                                                                onChange={(e) =>
                                                                                    updateSkillField(
                                                                                        moduleIndex,
                                                                                        skillIndex,
                                                                                        "links",
                                                                                        [e.target.value]
                                                                                    )
                                                                                }
                                                                            />
                                                                            <FieldError />
                                                                        </TextField>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                    ))}

                                                <Button type="button" onPress={addModule} variant="secondary">
                                                    Add Another Module
                                                </Button>
                                            </FieldGroup>

                                            <div className="flex justify-end gap-2 pb-5 pl-2 pr-2">
                                                <Button className="full-width p-3.5 font-bold rounded-4xl" style={{fontSize: "15px"}} type="submit">
                                                    Update
                                                </Button>
                                            </div>
                                        </Fieldset>
                                    </Form>
                                </div>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}
