// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { Alert, Spinner } from "@heroui/react";
//
// type Skill = {
//     id: number;
//     name: string;
//     description: string;
// };
//
// type Module = {
//     id: number;
//     name: string;
//     description: string;
//     skills: Skill[];
// };
//
// export default function RoadmapForm() {
//
//     const navigate = useNavigate();
//
//     const [name, setName]               = useState<string>("");
//     const [modules, setModules]         = useState<Module[]>([]);
//     const [loading, setLoading]         = useState<boolean>(false);
//     const [error, setError]             = useState<string | null>(null);
//
//     //adding modules with its attributes , ofc withing an array of skills
//     function addModule() {
//         setModules([...modules, { id: Date.now(), name: "", description: "", skills: [] }]);
//     }
//
//     //update module function to make sure you can type and change what u typed
//     function updateModule(moduleId: number, field: "name" | "description", value: string) {
//         setModules(
//             modules.map((m) => m.id === moduleId ? { ...m, [field]: value } : m)
//         );
//     }
//     //deleting of the module
//     function removeModule(moduleId: number) {
//         //filter is like an if condition in a loop for the react array
//         setModules(modules.filter((m) => m.id !== moduleId));
//     }
//
//     //adds to the array of skills withing a specific module
//     //map is like assigning that array of skills to the specific module with that id
//     function addSkill(moduleId: number) {
//         setModules(
//             modules.map((m) =>
//                 m.id === moduleId
//                     //this is like mapping the specific module from an array of modules
//                     //and then looping/adding an array of skills inside of it
//                     ? { ...m, skills: [...m.skills, { id: Date.now(), name: "", description: "" }] }
//                     : m
//             )
//         );
//     }
//
//     function updateSkill(moduleId: number, skillId: number, field: "name" | "description", value: string) {
//         setModules(
//             modules.map((m) => {
//                 if (m.id !== moduleId) return m;
//                 return {
//                     ...m,
//                     skills: m.skills.map((s) =>
//                         s.id === skillId ? { ...s, [field]: value } : s
//                     ),
//                 };
//             })
//         );
//     }
//
//     function removeSkill(moduleId: number, skillId: number) {
//         setModules(
//             modules.map((m) =>
//                 m.id === moduleId
//                     ? { ...m, skills: m.skills.filter((s) => s.id !== skillId) }
//                     : m
//             )
//         );
//     }
//
//     // @ts-ignore
//     async function handleSubmit(e) {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//
//         const payload = {
//             name,
//             modules: modules.map((m) => ({
//                 name: m.name,
//                 description: m.description,
//                 skills: m.skills.map((s) => ({
//                     name: s.name,
//                     description: s.description,
//                 })),
//             })),
//         };
//
//         try {
//             const res = await fetch("http://127.0.0.1:8000/roadmap/create", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });
//
//             const data = await res.json();
//
//             if (!res.ok) {
//                 const firstError = data.errors
//                     ? Object.values(data.errors)[0] as string
//                     : data.message;
//                 throw new Error(firstError || "Something went wrong");
//             }
//
//             navigate("/roadmaps");
//
//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     // @ts-ignore
//     // @ts-ignore
//     return (
//         <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-black text-white min-h-screen space-y-8">
//
//             {error && <Alert color="danger" title={error} className="bg-red-900/20 text-red-400 border border-red-900" children={undefined} />}
//
//             <div className="space-y-3">
//                 <label className="block text-sm font-bold tracking-wider uppercase text-gray-400">Roadmap name</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="E.g. Fullstack Developer 2026"
//                     required
//                     className="w-full bg-[#121212] border border-[#333] text-white px-4 py-3 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                 />
//             </div>
//
//             <div className="space-y-6">
//                 <div className="flex justify-between items-end border-b border-[#333] pb-2">
//                     <h3 className="text-2xl font-black">Modules</h3>
//                 </div>
//
//                 {modules.map((module, moduleIndex) => (
//                     <div key={module.id} className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg space-y-5">
//
//                         <div className="flex justify-between items-center">
//                             <span className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter">
//                                 Module {moduleIndex + 1}
//                             </span>
//                             <button type="button" onClick={() => removeModule(module.id)} className="text-gray-500 hover:text-red-500 transition-colors text-sm">
//                                 Delete Module
//                             </button>
//                         </div>
//
//                         <div className="grid grid-cols-1 gap-4">
//                             <input
//                                 type="text"
//                                 value={module.name}
//                                 placeholder="Module Title"
//                                 onChange={(e) => updateModule(module.id, "name", e.target.value)}
//                                 required
//                                 className="w-full bg-[#181818] border border-[#333] text-white px-4 py-2 rounded focus:border-blue-500 outline-none"
//                             />
//                             <input
//                                 type="text"
//                                 value={module.description}
//                                 placeholder="Module Description"
//                                 onChange={(e) => updateModule(module.id, "description", e.target.value)}
//                                 required
//                                 className="w-full bg-[#181818] border border-[#333] text-white px-4 py-2 rounded focus:border-blue-500 outline-none"
//                             />
//                         </div>
//
//                         <div className="mt-4 pl-4 border-l-2 border-[#222] space-y-4">
//                             <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Skills Included</p>
//
//                             {module.skills.map((skill) => (
//                                 <div key={skill.id} className="flex gap-3 items-center group">
//                                     <input
//                                         type="text"
//                                         value={skill.name}
//                                         placeholder="Skill Name"
//                                         onChange={(e) => updateSkill(module.id, skill.id, "name", e.target.value)}
//                                         required
//                                         className="flex-1 bg-[#121212] border border-[#333] text-white px-3 py-2 text-sm rounded focus:border-blue-400 outline-none"
//                                     />
//
//                                     <input
//                                         type="text"
//                                         value={skill.description}
//                                         placeholder="Brief description"
//                                         onChange={(e) => updateSkill(module.id, skill.id, "description", e.target.value)}
//                                         required
//                                         className="flex-1 bg-[#121212] border border-[#333] text-white px-3 py-2 text-sm rounded focus:border-blue-400 outline-none"
//                                     />
//
//                                     <button
//                                         type="button"
//                                         onClick={() => removeSkill(module.id, skill.id)}
//                                         className="text-gray-600 hover:text-red-500 px-2"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             ))}
//
//                             <button
//                                 type="button"
//                                 onClick={() => addSkill(module.id)}
//                                 className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase transition-colors"
//                             >
//                                 + Add Skill
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//
//                 <button
//                     type="button"
//                     onClick={addModule}
//                     className="w-full py-4 border-2 border-dashed border-[#333] rounded-lg text-gray-500 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all font-bold"
//                 >
//                     Add New Module
//                 </button>
//             </div>
//
//             <div className="pt-10">
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white font-black py-4 rounded-md shadow-2xl transition-all flex justify-center items-center gap-3 uppercase tracking-widest"
//                 >
//                     {loading ? <Spinner size="sm" color="white" /> : "Finalize Roadmap"}
//                 </button>
//             </div>
//
//         </form>
//     );
// }
import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import { useState } from "react";
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
    TextField,
} from "@heroui/react";

// @ts-ignore
export default function RoadMapCreate({ }) {
    const jobId = new URL(window.location.href).searchParams.get("jobId");

    const [modules, setModules] = useState([
        { skills: [{}] }
    ]);

    function addModule() {
        setModules([...modules, { skills: [{}] }]);
    }

    function removeModule(moduleIndex) {
        setModules(modules.filter((_, i) => i !== moduleIndex));
    }

    function addSkill(moduleIndex) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return { ...mod, skills: [...mod.skills, {}] };
        });
        setModules(updated);
    }

    function removeSkill(moduleIndex, skillIndex) {
        const updated = modules.map((mod, i) => {
            if (i !== moduleIndex) return mod;
            return { ...mod, skills: mod.skills.filter((_, si) => si !== skillIndex) };
        });
        setModules(updated);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get("title"),
            modules: modules.map((mod, moduleIndex) => ({
                name: formData.get(`modules[${moduleIndex}].name`),
                description: formData.get(`modules[${moduleIndex}].description`),
                skills: mod.skills.map((_, skillIndex) => ({
                    name: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].name`),
                    description: formData.get(`modules[${moduleIndex}].skills[${skillIndex}].description`),
                    links: [formData.get(`modules[${moduleIndex}].skills[${skillIndex}].links[0]`)]
                }))
            }))
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
            <div >
                <div align="center">
                    <Form method="post" className onSubmit={handleSubmit}>
                        <Fieldset>
                            <Description style={{ fontSize: "30px" }}>Create a RoadMap</Description>
                            <FieldGroup>
                                <TextField
                                    isRequired
                                    name="title"
                                    validate={(value) => {
                                        if (value.length < 3) return "Name must be at least 3 characters";
                                        return null;
                                    }}>
                                    <Label style={{ fontSize: "20px", color: "white" }}>ROADMAP TITLE</Label>
                                    <Input placeholder="Title" />
                                    <FieldError />
                                </TextField>
                                <br />

                                {modules.map((mod, moduleIndex) => (
                                    <div key={moduleIndex}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <h1 style={{ paddingLeft: "20px" }}>Module {moduleIndex + 1}</h1>
                                            {moduleIndex > 0 && (
                                                <Button type="button" onPress={() => removeModule(moduleIndex)} variant="destructive">
                                                    Remove
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            <TextField
                                                isRequired
                                                name={`modules[${moduleIndex}].name`}
                                                validate={(value) => {
                                                    if (value.length < 3) return "Name must be at least 3 characters";
                                                    return null;
                                                }}>
                                                <Label style={{ color: "white" }}>Name</Label>
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
                                            <Label style={{ color: "white" }}>Description</Label>
                                            <Input placeholder="Description" />
                                            <FieldError />
                                        </TextField>
                                        <br></br>

                                        {mod.skills.map((_, skillIndex) => (
                                            <div className="skill-card" key={skillIndex}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <span>Skill {skillIndex + 1}</span>
                                                    {skillIndex > 0 && (
                                                        <Button type="button" onPress={() => removeSkill(moduleIndex, skillIndex)} variant="destructive">
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

                                                <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].description`} type="text">
                                                    <Label>Skill Description</Label>
                                                    <Input placeholder="Description of the skill" />
                                                    <FieldError />
                                                </TextField>

                                                <TextField isRequired name={`modules[${moduleIndex}].skills[${skillIndex}].links[0]`} type="text">
                                                    <Label>Resource Link</Label>
                                                    <Input placeholder="https://..." />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                        ))}

                                        <br></br>
                                        <Button type="button" onPress={() => addSkill(moduleIndex)} variant="secondary">
                                            + Add Skill
                                        </Button>
                                    </div>
                                ))}

                                <Button type="button" onPress={addModule} variant="secondary">
                                    + Another Module
                                </Button>

                            </FieldGroup>

                            <div>
                                <Button type="submit">
                                    Apply
                                </Button>
                                <Button type="reset" variant="secondary">
                                    Reset
                                </Button>
                            </div>
                        </Fieldset>
                    </Form>
                </div>
            </div>

            <br /><br /><br />
            <IndexFooter />
        </>
    );
}
