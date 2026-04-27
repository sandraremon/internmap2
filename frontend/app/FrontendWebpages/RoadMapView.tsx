import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import { IndexFooter, IndexHeader } from "./fragments/IndexHeaderAndFooter";
import { Tabs } from "@heroui/react";

// @ts-ignore
export default function RoadMapView({ roadmap }) {

    return (
        <>
            <IndexHeader />

            <div className="wrapper">
                {roadmap ? (
                    <div>
                        <h1>{roadmap.name}</h1>

                        {roadmap.modules?.map((module, index) => (
                            <div className="module" key={module.id ?? index}>
                                <div className="module-title">{module.name}</div>
                                <div className="module-description">{module.description}</div>

                                <div className="skills-grid">
                                    {module.skills?.map((skill, skillIndex) => (
                                        <div className="" key={skill.id ?? skillIndex}>
                                            <div className="skill-name">{skill.name}</div>
                                            <div className="skill-description">{skill.description}</div>

                                            <div className="resource-links">
                                                {skill.skill_resource_links?.map((link, linkIndex) => (
                                                    <a key={linkIndex} href={link.resource_links} className="resource-link" target="_blank" rel="noreferrer">
                                                        Resource {linkIndex + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Roadmap not found</p>
                )}
            </div>

            <IndexFooter />
        </>
    );
}
