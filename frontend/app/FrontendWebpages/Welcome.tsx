import "../CSS/jobPosting.css"
import "../CSS/Roadmap.css";
import {IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, ComboBox, Disclosure, Input, ListBox, SearchField, useOverlayState} from "@heroui/react";
import React, {useState} from "react";
import type {Roadmap} from "../../Model/Roadmap";
import JobPostingModal from "./JobPostingModal";

import type { JobPosting as job } from "../../Model/JobPostingModal/JobPostingModal";
import { useNavigate } from 'react-router-dom';
import ApplicationForm from "./ApplicationForm";

let constJobPostings: JobPosting[] = [];
let constRoadmaps: Roadmap[] = [];

// @ts-ignore
export default function Welcome({roadmaps, jobPostings}: {roadmaps: Roadmap[], jobPostings: JobPostingModal[]}) {

    const navigate = useNavigate();
    constRoadmaps = roadmaps.slice(0, roadmaps.length);
    constJobPostings = jobPostings.slice(0, jobPostings.length);

    roadmaps = constRoadmaps;
    jobPostings = constJobPostings;

    let activeJobPosting: JobPosting | null = null;
    const [activePostingId, setActivePostingId] = useState<number | null>(null);

    const [isAllExpanded, setAllExpanded] = useState(true);
    const [isRecentsExpanded, setRecentsExpanded] = useState(true);
    const jobPostingFormOverlayState = useOverlayState({defaultOpen: false});
    const ApplicationFormOverlayState = useOverlayState({defaultOpen: false});

    let recentRoadmaps: Roadmap[] = [];

    roadmaps.reverse();

    if (roadmaps.length > 3) {
        for (let i = 0; i  < 4; i++) {
            recentRoadmaps.push(roadmaps.shift() as Roadmap)
        }
    } else {
        recentRoadmaps = roadmaps;
    }

    // @ts-ignore
    const [selectedKey, setSelectedKey] = useState<Key | null>("Roadmaps");


    return (

        <>
            <IndexHeader/>

            <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex justify-center justify-self-center flex-row items-center text-4xl font-bold mb-4 gap-3">
                    Explore
                    <ComboBox onSelectionChange={// @ts-ignore
                        (key) => setSelectedKey(key)
                    } defaultValue="Roadmaps">
                        <ComboBox.InputGroup>
                            <Input defaultValue="Roadmaps" style={{paddingLeft: "27px"}} />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                <ListBox.Item id="Roadmaps" textValue="Roadmaps">
                                    Roadmaps
                                </ListBox.Item>
                                <ListBox.Item id="Jobs" textValue="Jobs">
                                    Jobs
                                </ListBox.Item>
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                </div>

                <div className="flex justify-center self-center-safe items-center w-2/6 gap-3">
                    <SearchField name="search" variant="primary">
                        <SearchField.Group>
                            <SearchField.SearchIcon/>
                            <SearchField.Input placeholder="Search..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </div>
                <br/>
            </div>

            {// @ts-ignore
                selectedKey == "Roadmaps" ? (
                    <>
                        {constRoadmaps.length != 0 && (<div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                            <label className="container-label">Recents</label>
                            <Button style={{width: "32px", height: "32px", background: "var(--component-secondary)"}} className="dark" onClick={() => {
                                setRecentsExpanded(!isRecentsExpanded)
                                document.getElementById("recents-chevron")?.classList.toggle("rotate-270")

                            }} isIconOnly>
                                <img id={"recents-chevron"} src={"/images/assets/chevron@4x.png"} style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
                            </Button>
                        </div>)}

                        {roadmaps.length == 0 ?
                            <div className="flex items-center justify-center" style={{height: "47vh"}}>
                                <a className="label-placeholder"> No roadmaps to show </a>
                            </div> :
                            <>

                                <Disclosure isExpanded={isRecentsExpanded}>
                                    <Disclosure.Content className="overflow-visible">
                                        <Disclosure.Body className="overflow-visible">

                                            <div className="container-padded" style={{display: "grid", justifyContent: "start", gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))", gap: "50px", borderRadius: "65px"}}>
                                                {recentRoadmaps.map((roadmap: Roadmap) => (
                                                    <div onClick={() => location.href = `/roadmaps/${roadmap.id}`} className="roadmap-button min-w-72" key={roadmap.id} >
                                                        <a>
                                                            {roadmap.name}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>

                                        </Disclosure.Body>
                                    </Disclosure.Content>
                                </Disclosure>
                            </>
                        }

                        <br/><br/><br/>

                        {constRoadmaps.length != 0 && (<div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                            <label className="container-label">All Roadmaps</label>
                            <Button style={{width: "32px", height: "32px", background: "var(--component-secondary)"}} className="dark" onClick={() => {
                                setAllExpanded(!isAllExpanded)
                                document.getElementById("all-chevron")?.classList.toggle("rotate-270")
                            }} isIconOnly>
                                <img id="all-chevron" src="/images/assets/chevron@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
                            </Button>
                        </div>)}

                        <Disclosure isExpanded={isAllExpanded}>
                            <Disclosure.Content className="overflow-visible">
                                <Disclosure.Body className="overflow-visible">

                                    {roadmaps.length == 0 ?
                                        <></> :
                                        <>
                                            <div className="container-padded" style={{display: "grid", justifyContent: "start", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "50px", borderRadius: "50px"}}>
                                                {roadmaps.map((roadmap: Roadmap) => (
                                                    <div className="roadmap-button min-w-72" key={roadmap.id} >
                                                        <a href={`/roadmap/${roadmap.id}`}>
                                                            {roadmap.name}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    }


                                </Disclosure.Body>
                            </Disclosure.Content>
                        </Disclosure>
                        <br/><br/><br/>
                    </>
                ) : (
                <div
                    style={{display: "grid", justifyContent: "start", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",}}>

                    {jobPostings.map((posting: job) => (
                        <div key={posting.id} style={{width: "100%", background: "var(--Container-Secondary, rgba(255,255,255,0.85))", boxShadow: "0px 0px 40px rgba(0,0,0,0.17)", borderRadius: 45, backdropFilter: "blur(20px)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "16px",}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>

                                {/* Left - image + name */}
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <img style={{ width: 40, height: 40, borderRadius: 200, objectFit: "cover" }}
                                         src="http://localhost:8000/images/jinx.png" />
                                    <div>
                                        <div style={{ fontSize: 22, fontWeight: 700 }}>
                                            <a href={`/postings/${posting.id}`}>{posting.recruiter?.user?.f_name}</a>
                                        </div>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(0,0,0,0.4)" }}>
                                            <a href={`/postings/${posting.id}`}>{posting.company?.name}</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - tag */}
                                <div style={{padding: '4px 12px', background: 'linear-gradient(180deg, rgba(8, 109, 250, 0.52) 0%, rgba(27, 155, 254, 0.52) 100%)', borderRadius: 75, outline: '2px rgba(255, 255, 255, 0.20) solid', outlineOffset: '-2px', backdropFilter: 'blur(20px)', alignItems: 'center', justifyContent: 'center',}}>
                                <span style={{ color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '800', whiteSpace: 'nowrap' }}>
                                    <a href={`/postings/${posting.id}`}>
                                        {posting.type}
                                    </a>

                                </span>
                                </div>

                            </div>

                            <div>
                                <div style={{ fontSize: 24, fontWeight: 700 }} key={posting.id}>
                                    <a href={`/posting/${posting.id}`}>
                                    {posting.job_name}
                                </a>
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 500 }} >
                                    <a href={`/posting/${posting.id}`}>
                                        {posting.job_description}
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>
                                    <a href={`/postings/${posting.id}`}>
                                        {posting.name}
                                    </a>
                                </div>


                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button style={{ width: 40, height: 40, borderRadius: 40 }}>
                                        <img style={{ width: 20 }} src="http://localhost:8000/images/jinx.png"/>
                                    </button>

                                    <button
                                        onClick={() =>{setActivePostingId(posting.id);  ApplicationFormOverlayState.toggle()}}
                                        style={{width: 93, height: 40, borderRadius: 75, background: "#0E81EC", color: "white", fontSize: 18, fontWeight: 700, border: "none", cursor: "pointer",}}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ApplicationForm overlayState={ApplicationFormOverlayState} jobId={activePostingId} />

        </>
    );
}
