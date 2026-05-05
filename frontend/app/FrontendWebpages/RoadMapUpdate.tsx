// import "../CSS/jobPosting.css"
// import "../CSS/InternMapHomepage.css";
// import {useEffect, useState} from "react";
// import { IndexFooter, IndexHeader } from "./fragments/IndexHeaderAndFooter";
// import {
//     Button,
//     Description,
//     FieldError,
//     FieldGroup,
//     Fieldset,
//     Form,
//     Input,
//     Label,
//     TextField,
// } from "@heroui/react";
//
// // @ts-ignore
// export default function RoadMapUpdate({ }) {
//
//     useEffect(() => {
//         async function fetchRoadmap() {
//             const res = await fetch(`http://localhost:8000/api/roadmap/${roadmap.id}`);
//             const data = await res.json();
//             setModules(data.modules);
//         }
//         fetchRoadmap();
//     }, []);
//
//
//     const [modules, setModules] = useState([
//         { skills: [{}] }
//     ]);
//
//     function addModule() {
//         setModules([...modules, { skills: [{}] }]);
//     }
//
//     function removeModule(moduleIndex) {
//         setModules(modules.filter((_, i) => i !== moduleIndex));
//     }
//
//     function addSkill(moduleIndex) {
//         const updated = modules.map((mod, i) => {
//             if (i !== moduleIndex) return mod;
//             return { ...mod, skills: [...mod.skills, {}] };
//         });
//         setModules(updated);
//     }
//
//     function removeSkill(moduleIndex, skillIndex) {
//         const updated = modules.map((mod, i) => {
//             if (i !== moduleIndex) return mod;
//             return { ...mod, skills: mod.skills.filter((_, si) => si !== skillIndex) };
//         });
//         setModules(updated);
//     }
//
//     async function handleSubmit(e) {
//         e.preventDefault();
//
//         const formData = new FormData(e.currentTarget);
//
//         const body = {
//             name: formData.get("title"),
//             modules: modules.map((mod, moduleIndex) => ({
//                 name: formData.get(`modules[${moduleIndex}].name`),
//                 description: formData.get(`modules[${moduleIndex}].description`),
//                 skills: mod.skills.map((_, skillIndex) => ({
//                     name: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].name`),
//                     description: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].description`),
//                     links: [formData.get(`modules[${moduleIndex}].skills[${skillIndex}].links[0]`)]
//                 }))
//             }))
//         };
//
//         console.log(body);
//
//         const res = await fetch(`http://localhost:8000/api/roadmap/new/`, {
//             method: "POST",
//             body: JSON.stringify(body),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//
//         if (!res.ok) {
//             const errorText = await res.text();
//             console.error("Failed to create roadmap", res.status, errorText);
//             return;
//         }
//
//         console.log("Roadmap created!");
//     }
//
//     return (
//         <>
//             <IndexHeader />
//             <div >
//                 <div align="center">
//                     <Form method="post" className onSubmit={handleSubmit}>
//                         <Fieldset>
//                             <Description style={{ fontSize: "30px" }}>Create a RoadMap</Description>
//                             <FieldGroup>
//                                 <TextField
//                                     isRequired
//                                     name="title"
//                                     validate={(value) => {
//                                         if (value.length < 3) return "Name must be at least 3 characters";
//                                         return null;
//                                     }}>
//                                     <Label style={{ fontSize: "20px", color: "white" }}>ROADMAP TITLE</Label>
//                                     <Input placeholder="Title" />
//                                     <FieldError />
//                                 </TextField>
//                                 <br />
//
//                                 {modules.map((mod, moduleIndex) => (
//                                     <div key={moduleIndex}>
//                                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                             <h1 style={{ paddingLeft: "20px" }}>Module {moduleIndex + 1}</h1>
//                                             {moduleIndex > 0 && (
//                                                 <Button type="button" onPress={() => removeModule(moduleIndex)} variant="destructive">
//                                                     Remove
//                                                 </Button>
//                                             )}
//                                         </div>
//
//                                         <div>
//                                             <TextField
//                                                 isRequired
//                                                 name={`modules[${moduleIndex}].name`}
//                                                 validate={(value) => {
//                                                     if (value.length < 3) return "Name must be at least 3 characters";
//                                                     return null;
//                                                 }}>
//                                                 <Label style={{ color: "white" }}>Name</Label>
//                                                 <Input placeholder="Module name" />
//                                                 <FieldError />
//                                             </TextField>
//                                         </div>
//                                         <br />
//
//                                         <TextField
//                                             isRequired
//                                             name={`modules[${moduleIndex}].description`}
//                                             validate={(value) => {
//                                                 if (value.length < 3) return "Name must be at least 3 characters";
//                                                 return null;
//                                             }}>
//                                             <Label style={{ color: "white" }}>Description</Label>
//                                             <Input placeholder="Description" />
//                                             <FieldError />
//                                         </TextField>
//                                         <br></br>
//
//                                         {mod.skills.map((_, skillIndex) => (
//                                             <div className="skill-card" key={skillIndex}>
//                                                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                                     <span>Skill {skillIndex + 1}</span>
//                                                     {skillIndex > 0 && (
//                                                         <Button type="button" onPress={() => removeSkill(moduleIndex, skillIndex)} variant="destructive">
//                                                             Remove
//                                                         </Button>
//                                                     )}
//                                                 </div>
//
//                                                 <TextField
//                                                     isRequired
//                                                     name={`modules[${moduleIndex}].skills[${skillIndex}].name`}
//                                                     validate={(value) => {
//                                                         if (value.length < 3) return "Name must be at least 3 characters";
//                                                         return null;
//                                                     }}>
//                                                     <Label>Skill Name</Label>
//                                                     <Input placeholder="Skill name" />
//                                                     <FieldError />
//                                                 </TextField>
//
//                                                 <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].description`} type="text">
//                                                     <Label>Skill Description</Label>
//                                                     <Input placeholder="Description of the skill" />
//                                                     <FieldError />
//                                                 </TextField>
//
//                                                 <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].links[0]`} type="text">
//                                                     <Label>Resource Link</Label>
//                                                     <Input placeholder="https://..." />
//                                                     <FieldError />
//                                                 </TextField>
//                                             </div>
//
//                                         ))}
//
//                                         <br></br>
//                                         <Button type="button" onPress={() => addSkill(moduleIndex)} variant="secondary">
//                                             + Add Skill
//                                         </Button>
//                                     </div>
//                                 ))}
//
//                                 <Button type="button" onPress={addModule} variant="secondary">
//                                     + Another Module
//                                 </Button>
//
//                             </FieldGroup>
//
//                             <div>
//                                 <Button type="submit">
//                                     Apply
//                                 </Button>
//                                 <Button type="reset" variant="secondary">
//                                     Reset
//                                 </Button>
//                             </div>
//                         </Fieldset>
//                     </Form>
//                 </div>
//             </div>
//
//             <br /><br /><br />
//             <IndexFooter />
//         </>
//     );
// }
import "../CSS/jobPosting.css";
import "../CSS/InternMapHomepage.css";
import { useEffect, useState } from "react";
import { IndexFooter, IndexHeader } from "./fragments/IndexHeaderAndFooter";
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
    TextField, type UseOverlayStateReturn,
} from "@heroui/react";

// {overlayState}: {overlayState: UseOverlayStateReturn}
//{overlayState, jobId}: {overlayState: UseOverlayStateReturn ,jobId: number | null}
// pass roadmapId as prop
export default function RoadMapEdit({overlayState,roadmapId}:{overlayState:UseOverlayStateReturn,roadmapId:number|null} ) {
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

    function removeModule(moduleIndex) {
        const updated = modules.map((mod, i) =>
            i === moduleIndex ? { ...mod, _deleted: true } : mod
        );
        setModules(updated);
    }

    function updateModuleField(moduleIndex, field, value) {
        const updated = modules.map((mod, i) =>
            i === moduleIndex ? { ...mod, [field]: value } : mod
        );
        setModules(updated);
    }

    // ================= SKILL =================

    function addSkill(moduleIndex) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return {
                ...mod,
                skills: [...(mod.skills || []), { name: "", description: "", links: [""] }],
            };
        });
        setModules(updated);
    }

    function removeSkill(moduleIndex, skillIndex) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;

            const newSkills = mod.skills.map((skill, si) =>
                si === skillIndex ? { ...skill, _deleted: true } : skill
            );

            return { ...mod, skills: newSkills };
        });

        setModules(updated);
    }

    function updateSkillField(moduleIndex, skillIndex, field, value) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;

            const newSkills = mod.skills.map((skill, si) =>
                si === skillIndex ? { ...skill, [field]: value } : skill
            );

            return { ...mod, skills: newSkills };
        });

        setModules(updated);
    }

    // ================= SUBMIT =================

    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            name: title,
            modules: modules.map((mod) => ({
                id: mod.id,
                name: mod.name,
                description: mod.description,
                _deleted: mod._deleted || false,
                skills: (mod.skills || []).map((skill) => ({
                    id: skill.id,
                    name: skill.name,
                    description: skill.description,
                    links: skill.links || [""],
                    _deleted: skill._deleted || false,
                })),
            })),
        };

        console.log("UPDATE BODY:", body);

        const res = await fetch(`/api/roadmap/${roadmapId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            console.error("Update failed", await res.text());
            return;
        }

        console.log("Roadmap updated successfully!");
    }

    // ================= UI =================

    return (
        <>
            <IndexHeader />

            <Modal isOpen={onRoadmapState.isOpen}>
                <Modal.Backdrop className="dark" variant="blur" isKeyboardDismissDisabled={false} isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90 rounded-4xl">
                            <Modal.CloseTrigger onClick={() => onRoadmapState.close()} />
                            <Modal.Header>
                                <img src="/images/navi/Navi%20Beta.png" alt="Logo" style={{height: "60px", width: "60px"}}/>
                                <Modal.Heading>Welcome to Internmap!</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <div align="center">
                                    <Form onSubmit={handleSubmit}>
                                        <Fieldset>
                                            <Description style={{ fontSize: "30px" }}>
                                                Edit RoadMap
                                            </Description>

                                            <FieldGroup>
                                                {/* TITLE */}
                                                <TextField isRequired>
                                                    <Label style={{ color: "white" }}>ROADMAP TITLE</Label>
                                                    <Input
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </TextField>

                                                <br />

                                                {/* MODULES */}
                                                {modules
                                                    .filter((mod) => !mod._deleted)
                                                    .map((mod, moduleIndex) => (
                                                        <div key={moduleIndex}>
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                <h1>Module {moduleIndex + 1}</h1>

                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    onPress={() => removeModule(moduleIndex)}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>

                                                            <TextField isRequired>
                                                                <Label>Name</Label>
                                                                <Input
                                                                    value={mod.name || ""}
                                                                    onChange={(e) =>
                                                                        updateModuleField(moduleIndex, "name", e.target.value)
                                                                    }
                                                                />
                                                            </TextField>

                                                            <TextField isRequired>
                                                                <Label>Description</Label>
                                                                <Input
                                                                    value={mod.description || ""}
                                                                    onChange={(e) =>
                                                                        updateModuleField(moduleIndex, "description", e.target.value)
                                                                    }
                                                                />
                                                            </TextField>

                                                            {/* SKILLS */}
                                                            {(mod.skills || [])
                                                                .filter((s) => !s._deleted)
                                                                .map((skill, skillIndex) => (
                                                                    <div className="skill-card" key={skillIndex}>
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <span>Skill {skillIndex + 1}</span>

                                                                            <Button
                                                                                type="button"
                                                                                variant="destructive"
                                                                                onPress={() =>
                                                                                    removeSkill(moduleIndex, skillIndex)
                                                                                }
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </div>

                                                                        <TextField isRequired>
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
                                                                        </TextField>

                                                                        <TextField isRequired>
                                                                            <Label>Description</Label>
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
                                                                        </TextField>

                                                                        <TextField>
                                                                            <Label>Link</Label>
                                                                            <Input
                                                                                value={skill.links?.[0] || ""}
                                                                                onChange={(e) =>
                                                                                    updateSkillField(
                                                                                        moduleIndex,
                                                                                        skillIndex,
                                                                                        "links",
                                                                                        [e.target.value]
                                                                                    )
                                                                                }
                                                                            />
                                                                        </TextField>
                                                                    </div>
                                                                ))}

                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                onPress={() => addSkill(moduleIndex)}
                                                            >
                                                                + Add Skill
                                                            </Button>

                                                            <hr />
                                                        </div>
                                                    ))}

                                                <Button type="button" onPress={addModule}>
                                                    + Add Module
                                                </Button>
                                            </FieldGroup>

                                            <div>
                                                <Button type="submit">Update</Button>
                                            </div>
                                        </Fieldset>
                                    </Form>
                                </div>
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


            <IndexFooter />
        </>
    );
}
