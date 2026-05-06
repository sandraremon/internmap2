import "../CSS/jobPosting.css"
import "../CSS/Roadmap.css";
import {IndexFooter, IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, ComboBox, Disclosure, Input, ListBox, SearchField, useOverlayState} from "@heroui/react";
import React, {useEffect, useState} from "react";
import type {Roadmap} from "../../Model/Roadmap";
import type { JobPosting as job } from "../../Model/JobPosting";
import { useNavigate } from 'react-router-dom';
import ApplicationForm from "./ApplicationForm";

export default function Welcome({roadmaps, jobPostings}: {roadmaps: Roadmap[], jobPostings: job[]}) {
    const [search, setSearch] = useState("");

    const getTimeAgo = (date: string | Date) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) return "Unknown date";

        const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000);

        if (seconds < 5) return "just now";
        if (seconds < 0) return "in the future";

        let interval = seconds / 31536000;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " year ago" : " years ago");

        interval = seconds / 2592000;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " month ago" : " months ago");

        interval = seconds / 604800;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " week ago" : " weeks ago");

        interval = seconds / 86400;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " day ago" : " days ago");

        interval = seconds / 3600;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " hour ago" : " hours ago");

        interval = seconds / 60;
        if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " minute ago" : " minutes ago");

        return Math.floor(seconds) + (Math.floor(seconds) === 1 ? " second ago" : " seconds ago");
    };

    const [role, setRole] = useState("none");

    async function fetchRole() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/role`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRole(data.role);
            }
        } catch (error) {
            console.error("Error fetching role:", error);
        }
    }

    useEffect(() => {
        fetchRole();
    })

    const navigate = useNavigate();
    const sortedRoadmaps = [...roadmaps].reverse();
    const filteredRoadmaps = sortedRoadmaps.filter((roadmap) =>
        roadmap.name.toLowerCase().includes(search.toLowerCase())
    );
    const sortedJobPostings = [...jobPostings];
    const filteredJobs = sortedJobPostings.filter((job) => {
        const q = search.toLowerCase();
        return (
            job.job_name.toLowerCase().includes(q) ||
            job.company?.name?.toLowerCase().includes(q)
        );
    });
    const isSearching = search.trim().length > 0;

    let activeJobPosting: job | null = null;
    const [activePostingId, setActivePostingId] = useState<number | null>(null);

    const [isAllExpanded, setAllExpanded] = useState(true);
    const [isRecentsExpanded, setRecentsExpanded] = useState(true);
    const jobPostingFormOverlayState = useOverlayState({defaultOpen: false});
    const ApplicationFormOverlayState = useOverlayState({defaultOpen: false});

    const recentRoadmaps = sortedRoadmaps.slice(0, 4);

    // @ts-ignore
    const [selectedKey, setSelectedKey] = useState<Key | null>("Roadmaps");
    return (
        <>
            <IndexHeader/>

            <div className="flex flex-col items-center justify-center gap-3">
                <div
                    className="flex justify-center justify-self-center flex-row items-center text-4xl font-bold mb-4 gap-3">
                    Explore

                    <ComboBox
                        onSelectionChange={// @ts-ignore
                            (key) => setSelectedKey(key)
                        }
                        defaultValue="Roadmaps"
                    >
                        <ComboBox.InputGroup>
                            <Input defaultValue="Roadmaps" style={{paddingLeft: "27px"}}/>
                            <ComboBox.Trigger/>
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
                            <SearchField.Input
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchField.ClearButton onClick={() => setSearch("")}/>
                        </SearchField.Group>
                    </SearchField>
                </div>

                <br/>
            </div>

            {/* ================= ROADMAPS ================= */}
            {selectedKey == "Roadmaps" ? (
                isSearching ? (
                    // 🔍 SEARCH MODE
                    filteredRoadmaps.length === 0 ? (
                        <div className="flex items-center justify-center" style={{height: "47vh"}}>
                            <a className="label-placeholder">No roadmaps found</a>
                        </div>
                    ) : (
                        <div
                            className="container-padded"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
                                gap: "50px",
                            }}
                        >
                            {filteredRoadmaps.map((roadmap: Roadmap) => (
                                <div
                                    key={roadmap.id}
                                    className="roadmap-button min-w-72"
                                    style={{cursor: "pointer"}}
                                    onClick={() => (location.href = `/roadmaps/${roadmap.id}`)}
                                >
                                    {roadmap.name}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    // 🟢 NORMAL ROADMAP UI
                    <>
                        {sortedRoadmaps.length != 0 && (
                            <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                                <label className="container-label">Recents</label>

                                <Button
                                    style={{width: "32px", height: "32px", background: "var(--component-secondary)"}}
                                    className="dark"
                                    onClick={() => {
                                        setRecentsExpanded(!isRecentsExpanded);
                                        document.getElementById("recents-chevron")?.classList.toggle("rotate-270");
                                    }}
                                    isIconOnly
                                >
                                    <img
                                        id="recents-chevron"
                                        src={"/images/assets/chevron@4x.png"}
                                        style={{width: "16px", filter: "invert(0.3)"}}
                                        alt="pencil"
                                    />
                                </Button>
                            </div>
                        )}

                        {sortedRoadmaps.length == 0 ? (
                            <div className="flex items-center justify-center" style={{height: "47vh"}}>
                                <a className="label-placeholder"> No roadmaps to show </a>
                            </div>
                        )
                            : (
                            <>
                                <Disclosure isExpanded={isRecentsExpanded}>
                                    <Disclosure.Content className="overflow-visible">
                                        <Disclosure.Body className="overflow-visible">
                                            <div
                                                className="container-padded"
                                                style={{
                                                    display: "grid",
                                                    justifyContent: "center",
                                                    gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
                                                    gap: "50px",
                                                    borderRadius: "65px",
                                                }}
                                            >
                                                {recentRoadmaps.map((roadmap: Roadmap) => (
                                                    <div
                                                        key={roadmap.id}
                                                        style={{cursor: "pointer"}}
                                                        onClick={() => (location.href = `/roadmap/${roadmap.id}`)}
                                                        className="roadmap-button min-w-72"
                                                    >
                                                        <a>{roadmap.name}</a>
                                                    </div>
                                                ))}
                                            </div>
                                        </Disclosure.Body>
                                    </Disclosure.Content>
                                </Disclosure>
                            </>
                        )}

                        <br/><br/><br/>

                        {sortedRoadmaps.length != 0 && (
                            <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                                <label className="container-label">All Roadmaps</label>

                                <Button
                                    style={{width: "32px", height: "32px", background: "var(--component-secondary)"}}
                                    className="dark"
                                    onClick={() => {
                                        setAllExpanded(!isAllExpanded);
                                        document.getElementById("all-chevron")?.classList.toggle("rotate-270");
                                    }}
                                    isIconOnly
                                >
                                    <img
                                        id="all-chevron"
                                        src="/images/assets/chevron@4x.png"
                                        style={{width: "16px", filter: "invert(0.3)"}}
                                        alt="pencil"
                                    />
                                </Button>
                            </div>
                        )}

                        <Disclosure isExpanded={isAllExpanded}>
                            <Disclosure.Content className="overflow-visible">
                                <Disclosure.Body className="overflow-visible">
                                    {sortedRoadmaps.length != 0 && (
                                        <div
                                            className="container-padded"
                                            style={{
                                                display: "grid",
                                                justifyContent: "start",
                                                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                                                gap: "50px",
                                                borderRadius: "50px",
                                            }}
                                        >
                                            {sortedRoadmaps.map((roadmap: Roadmap) => (
                                                <div className="roadmap-button min-w-72" key={roadmap.id}>
                                                    <a href={`/roadmap/${roadmap.id}`}>{roadmap.name}</a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Disclosure.Body>
                            </Disclosure.Content>
                        </Disclosure>

                        <br/><br/><br/>
                    </>
                )
            ) : (
                /*================= JOBS =================*/
                <div className="flex flex-col items-center justify-center gap-20 pl-10 pr-10 pt-10">

                    {(isSearching ? filteredJobs : sortedJobPostings).length === 0 ? (
                        <div style={{height: "47vh"}} className="flex items-center justify-center">
                            <a className="label-placeholder">No jobs found</a>
                        </div>
                    ) : (
                        (isSearching ? filteredJobs : sortedJobPostings).map((posting: job) => (
                            <div
                                key={posting.id.toString()}
                                className="container-full-width"
                                style={{padding: "25px"}}
                            >
                                {/* ================= YOUR ORIGINAL JOB CARD (UNCHANGED) ================= */}

                                <div className="flex justify-between items-center">



                                    {/* Left - image + name */}
                                    <div className={"flex gap-2 items-center"}>
                                        <img style={{width: 50,  borderRadius: 40}} src={
                                            posting.company?.logo
                                                ? `http://127.0.0.1:8000/storage/${posting.company.logo}`
                                                : "/images/navi/Navi%20Beta.png"
                                        } alt={posting.company?.name || "Company"}/>
                                    <div>
                                        <div style={{ fontSize: 20, fontWeight: 700 }}>
                                            <a href={`/postings/${posting.id}`}>{posting.recruiter?.user?.f_name}</a>
                                        </div>
                                        <div className="text-xs font-medium text-gray-400">
                                            <a href={`/postings/${posting.id}`}>{posting.company?.name}</a>
                                        </div>
                                    </div>
                                    </div>


                                    {/* Right - tag */}
                                    {posting.type == "Internship" && (
                                <div style={{padding: '4px 12px', background: 'linear-gradient(180deg, rgba(8, 109, 250, 0.8) 0%, rgba(27, 155, 254, 0.9) 100%)', borderRadius: 75, outline: '2px rgba(255, 255, 255, 0.20) solid', outlineOffset: '-2px', backdropFilter: 'blur(20px)', alignItems: 'center', justifyContent: 'center',}} className="ml-auto">
                                <span style={{ color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '800', whiteSpace: 'nowrap' }}>
                                    <a href={`/postings/${posting.id}`}>
                                        {posting.type}
                                    </a>
                                </span>
                                </div>
                                    )}

                                {posting.type == "FullTime" && (
                                    <div style={{padding: '4px 12px', background: 'linear-gradient(180deg, rgba(254, 27, 84, 0.8), rgba(251, 8, 8, 0.9))', borderRadius: 75, outline: '2px rgba(255, 255, 255, 0.20) solid', outlineOffset: '-2px', backdropFilter: 'blur(20px)', alignItems: 'center', justifyContent: 'center',}} className="ml-auto">
                                <span style={{ color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '800', whiteSpace: 'nowrap' }}>
                                    <a href={`/postings/${posting.id}`}>
                                        {posting.type}
                                    </a>
                                </span>
                                    </div>
                                )}

                                {posting.type == "FreeLanceProject" && (
                                    <div style={{padding: '4px 12px', background: 'linear-gradient(180deg, rgba(254, 126, 27, 1), rgba(251, 128, 8, 1))', borderRadius: 75, outline: '2px rgba(255, 255, 255, 0.20) solid', outlineOffset: '-2px', backdropFilter: 'blur(20px)', alignItems: 'center', justifyContent: 'center',}} className="ml-auto">
                                <span style={{ color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '800', whiteSpace: 'nowrap' }}>
                                    <a href={`/postings/${posting.id}`}>
                                        Freelance
                                    </a>
                                </span>
                                    </div>
                                )}
                            <br/>

                                </div>

                                <br/>

                                <div>
                                    <div className="text-xl font-bold mb-0.5">
                                        <a href={`/posting/${posting.id}`}>{posting.job_name}</a>
                                    </div>

                                    <div>
                                        <a href={`/posting/${posting.id}`}>{posting.job_description}</a>
                                    </div>
                                </div>

                                <hr
                                    className="mt-3.5 mb-3.5 rounded-full border-2"
                                    style={{borderColor: "var(--component-quaternary)"}}
                                />

                                <div className="flex justify-between items-center">

                                    <div className="text-sm font-medium" style={{color: "var(--text-tertiary)"}}>
                                        {getTimeAgo(posting.date_posted)}
                                    </div>

                                    <div className="flex gap-2 items-center align-middle">
                                        <Button variant="secondary" isIconOnly style={{width: 40, height: 40}}>
                                            <img
                                                className="theme-adaptive-icon"
                                                style={{width: 16}}
                                                src="/images/assets/arrow.up.left.and.arrow.down.right@4x.png"
                                                alt="expand"
                                            />
                                        </Button>

                                        <Button
                                            isDisabled={role !== "ROLE_STUDENT"}
                                            onClick={() => {
                                                setActivePostingId(posting.id);
                                                ApplicationFormOverlayState.toggle();
                                            }}
                                            style={{width: 93, height: 40, borderRadius: 75, background: "var(--primary-color)", color: "white", fontSize: 18, fontWeight: 700, border: "none", cursor: "pointer",
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <br/><br/>
            <IndexFooter/>

            <ApplicationForm overlayState={ApplicationFormOverlayState} jobId={activePostingId}/>
        </>
    );
}
