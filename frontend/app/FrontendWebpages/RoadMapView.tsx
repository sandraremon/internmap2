import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {Button, Card, CardContent, Tabs} from "@heroui/react";
import {useState} from "react";
import { motion } from "framer-motion";
import {IndexHeader} from "./fragments/IndexHeaderAndFooter";
interface ResourceLink {
    resource_links: string;
}

interface Skill {
    id?: number;
    name: string;
    description?: string;
    skill_resource_links?: ResourceLink[];
}

interface Module {
    id?: number;
    name: string;
    skills?: Skill[];
}

interface Roadmap {
    name: string;
    modules: Module[];
}

export default function RoadMapView({ roadmap }: { roadmap: Roadmap }) {
    const [openSkill, setOpenSkill] = useState<string | null>(null);

    if (!roadmap?.modules) return null;

    const width = 1100;
    const heightStep = 180;
    const centerX = width / 2;
    const amplitude = 220;
    const n = roadmap.modules.length;

    const points = roadmap.modules.map((_, i) => {
        const t = n === 1 ? 0 : i / (n - 1);
        const y = i * heightStep + 120;
        const x = centerX + Math.sin(t * Math.PI * 2) * amplitude;
        return { x, y };
    });

    const totalHeight = (n - 1) * heightStep + 120 + 300;

    const pathD = points
        .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
        .join(" ");

    return (
        <>
        <IndexHeader/>
        <div className="w-full min-h-screen bg-white flex justify-center py-10">

            <div className="container">
                <br />     <br />      <br />
            <div style={{ width, height: totalHeight }} className="relative">
                <h1 className="text-4xl font-bold mb-16 text-center">
                    {roadmap.name}
                </h1>
                <br />     <br />      <br />
                <svg
                    className="absolute top-0 left-0 w-full pointer-events-none overflow-visible"
                    height={totalHeight}
                >
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="10 12"
                    />
                    {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="7" fill="#111827" />
                    ))}
                </svg>

                {roadmap.modules.map((module, i) => {
                    const { x, y } = points[i];

                    return (
                        <div
                            key={module.id ?? i}
                            className="absolute flex flex-col items-center overflow-visible"
                            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white shadow-xl rounded-2xl px-6 py-4 border"
                            >

                                <h2 className="font-semibold text-sm text-center">
                                    {module.name}
                                </h2>
                            </motion.div>

                            <div className="mt-5 flex flex-col items-center gap-2 overflow-visible">
                                {module.skills?.map((skill, si) => {
                                    let key = `${i}-${si}`;
                                    const isOpen = openSkill === key;

                                    return (
                                        <div key={skill.id ?? key} className="flex flex-col items-center overflow-visible">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setOpenSkill(isOpen ? null : key)}
                                                className="cursor-pointer bg-gray-100 border px-3 py-1 rounded-full text-xs"
                                            >
                                                {skill.name}
                                            </motion.div>

                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-2 z-50"
                                                >
                                                    <div className="w-56 bg-white border rounded-xl p-3 space-y-2 shadow-lg">

                                                        {skill.skill_resource_links?.map((linkObj, idx) => (
                                                            <>
                                                                <p className="text-xs font-medium opacity-70">
                                                                    Skill Description:
                                                                </p>
                                                                <div className="text-xs border rounded px-2 py-1 block truncate hover:bg-gray-50">
                                                                    {skill.description}
                                                                </div>
                                                                <p className="text-xs font-medium opacity-70">
                                                                    Resources
                                                                </p>
                                                            <a
                                                                key={idx}
                                                                href={linkObj.resource_links}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-xs border rounded px-2 py-1 block truncate hover:bg-gray-50"
                                                            >
                                                                {linkObj.resource_links.replace(/^https?:\/\//, "")}

                                                            </a>

                                                            </>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
        </>
    );
}

