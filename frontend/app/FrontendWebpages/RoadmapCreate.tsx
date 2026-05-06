import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import { useState } from "react";
import { IndexFooter, IndexHeader } from "./fragments/IndexHeaderAndFooter";
import {Button, FieldError, FieldGroup, Fieldset, Form, IconPlus, Input, Label, TextField,} from "@heroui/react";

// @ts-ignore
export default function RoadmapCreate() {

    const [modules, setModules] = useState([
        { skills: [{}] }
    ]);

    function addModule() {
        setModules([...modules, { skills: [{}] }]);
    }

    function removeModule(moduleIndex: any) {
        setModules(modules.filter((_, i) => i !== moduleIndex));
    }

    function addSkill(moduleIndex: any) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return { ...mod, skills: [...mod.skills, {}] };
        });
        setModules(updated);
    }

    function removeSkill(moduleIndex: any, skillIndex: any) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return { ...mod, skills: mod.skills.filter((_, si) => si !== skillIndex) };
        });
        setModules(updated);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // const body = {
        //     name: formData.get("title"),
        //     modules: modules.map((mod, moduleIndex) => ({
        //         name: formData.get(`modules[${moduleIndex}].name`),
        //         description: formData.get(`modules[${moduleIndex}].description`),
        //         skills: mod.skills.map((_, skillIndex) => ({
        //             name: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].name`),
        //             description: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].description`),
        //             links: [formData.get(`modules[${moduleIndex}].skills[${skillIndex}].links[0]`)]
        //         }))
        //     }))
        // };
        const body = {
            name: title,
            modules: modules.map((mod) => ({
                name: mod.name,
                description: mod.description,
                skills: mod.skills.map((skill) => ({
                    name: skill.name,
                    description: skill.description,
                    links: skill.links || [],
                })),
            })),
        };

        console.log(body);

        const res = await fetch(`http://localhost:8000/api/roadmap/new/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to create roadmap", res.status, errorText);
            return;
        }

        console.log("Roadmap created!");
    }

    return (
        <>
            <IndexHeader />
            <div className="pl-25 pr-25 pt-15 pb-15">
                    <Form className="flex container-full-width rounded-4xl" method="post" onSubmit={handleSubmit}>
                        <h1 className="text-lg self-center font-bold flex p-7" style={{ fontSize: "30px"}}>Create a Roadmap</h1>
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
                                    <Input placeholder="Title" />
                                    <FieldError />
                                </TextField>

                                {modules.map((mod, moduleIndex) => (
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

                                        <div>
                                            <TextField
                                                isRequired
                                                name={`modules[${moduleIndex}].name`}
                                                validate={(value) => {
                                                    if (value.length < 3) return "Name must be at least 3 characters";
                                                    return null;
                                                }}>
                                                <Label>Name</Label>
                                                <Input placeholder="Module name" />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                        <br />

                                        <TextField
                                            isRequired
                                            name={`modules[${moduleIndex}].description`}
                                            validate={(value) => {
                                                if (value.length < 3) return "Name must be at least 3 characters";
                                                return null;
                                            }}>
                                            <Label>Description</Label>
                                            <Input placeholder="Description" />
                                            <FieldError />
                                        </TextField>
                                        <br></br>

                                        <div className="gap-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}}>
                                        {mod.skills.map((_, skillIndex) => (
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
                                                    <Input placeholder="Skill name" />
                                                    <FieldError />
                                                </TextField>

                                                <br/>
                                                <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].description`} type="text">
                                                    <Label>Skill Description</Label>
                                                    <Input placeholder="Description of the skill" />
                                                    <FieldError />
                                                </TextField>

                                                <br/>
                                                <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].links[0]`} type="text">
                                                    <Label>Resource Link</Label>
                                                    <Input placeholder="https://InternMap.com" />
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
                                <Button type="reset" variant="danger-soft">
                                    Reset
                                </Button>
                                <Button type="submit">
                                    Create
                                </Button>
                            </div>
                        </Fieldset>
                    </Form>
            </div>

            <IndexFooter/>
        </>
    );
}
