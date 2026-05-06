import {IndexFooter, IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, Chip, Table, useOverlayState, cn, Modal} from "@heroui/react";
import {useNavigate} from 'react-router-dom';
import CVForm from "./CV";
import {useFetcher} from "react-router";
import {AlertDialog} from "@heroui/react";
import {Icon} from "@iconify/react";
import React, {useState} from "react";
import type {Roadmap} from "../../Model/Roadmap";
import RoadMapEdit from "../FrontendWebpages/RoadMapUpdate";
import Dashboard from "./Dashboard";

function SortableColumnHeader({children, sortDirection}: {
    children: React.ReactNode;
    sortDirection?: "ascending" | "descending";
}) {
    return (
        <span className="flex items-center justify-between">
            {children}
            {!!sortDirection && (
                <Icon icon="gravity-ui:chevron-up" className={cn(
                    "size-3 transform transition-transform duration-100 ease-out",
                    sortDirection === "descending" ? "rotate-180" : "",
                )}/>
            )}
        </span>
    );
}

export default function Profile({userDetails, roadmaps = [], users = []}: { users: User[], userDetails: User, roadmaps: Roadmap[] }) {

    const [selectedRoadmapId, setSelectedRoadmapId] = useState<number | null>(null);
    //edit part by shimaa
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        f_name: String(userDetails.f_name ?? ""),
        l_name: String(userDetails.l_name ?? ""),
        email: String(userDetails.email ?? ""),
        student_major: String(userDetails.student?.student_major ?? ""),
        graduating_year: String(userDetails.student?.graduating_year ?? ""),
        uni_name: String(userDetails.student?.uni_name ?? ""),
        faculty: String(userDetails.student?.faculty ?? ""),
        title: String(userDetails.recruiter?.title ?? ""),
    });
    const [editLoading, setEditLoading] = useState(false);

    async function saveProfile() {
        setEditLoading(true);

        const payload: Record<string, string> = {
            f_name: editForm.f_name,
            l_name: editForm.l_name,
            email: editForm.email,
        };

        if (userDetails.role === "STUDENT") {
            payload.student_major = editForm.student_major;
            payload.graduating_year = editForm.graduating_year;
            payload.uni_name = editForm.uni_name;
            payload.faculty = editForm.faculty;
        }

        if (userDetails.role === "RECRUITER") {
            payload.title = editForm.title;
        }
        console.log(userDetails.recruiter);

        const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const json = await response.json();
        console.log(json);
        setEditLoading(false);
        setIsEditOpen(false);
        window.location.reload();
    }

    // @ts-ignore
    const fetcher = useFetcher();

    console.log(userDetails);
    const navigate = useNavigate();
    const CVFormOverlayState = useOverlayState({defaultOpen: false});
    const roadmapFormOverlayState = useOverlayState({defaultOpen: false});

    const applicationList: Application[] =
        userDetails.role === "STUDENT"
            ? userDetails.student?.applications ?? []
            : [];

    if (applicationList != null) {
        applicationList.sort((e, f) => {
            if (e.application_date < f.application_date) return 1;
            else if (e.application_date === f.application_date) return 0;
            else return -1;
        });

        for (let i = 0; i < applicationList.length; i++) {
            for (let j = applicationList.length - 1; j > i; j--) {
                if (
                    applicationList[i].job_posting &&
                    applicationList[j].job_posting &&
                    applicationList[i].job_posting.job_name === applicationList[j].job_posting.job_name &&
                    applicationList[i].job_posting.company?.name === applicationList[j].job_posting.company?.name
                ) {
                    applicationList.splice(j, 1);
                }
            }
        }
    }

    console.log(applicationList);

    return (
        <>
            <IndexHeader/>

            <div className="pl-17 pt-8">
                <div className="flex items-center gap-4 flex-row">
                    <img src="/images/navi/Navi%20Beta.png"
                         style={{display: "flex", width: "100px", height: "100px", borderRadius: "100%"}}
                         alt="Unstable Logo"/>
                    <div style={{gap: "7px", display: "flex", flexDirection: "column"}}>
                        <section>
                            <p className="auto-capitalise text-3xl font-bold">{userDetails.f_name + " " + userDetails.l_name}</p>
                            <p>{userDetails.email}</p>
                        </section>
                        <div className="flex items-center gap-4 flex-row">
                            <Chip style={{gap: "4px"}} size="lg">
                                <img src="/images/assets/calendar@4x.png" alt="calendar" style={{width: "17px", filter: "invert(0.8)"}}/>
                                <Chip.Label>{userDetails.created_at?.toString().substring(0, 4) ?? "N/A"}</Chip.Label>
                            </Chip>
                            <Chip style={{gap: "4px"}} size="lg">
                                <img src="/images/assets/person.fill@4x.png" alt="person" style={{width: "15px", filter: "invert(0.8)"}}/>
                                <Chip.Label>
                                    {userDetails?.role
                                        ? userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1).toLowerCase()
                                        : "N/A"}
                                </Chip.Label>
                            </Chip>

                            {userDetails.role == "RECRUITER" && (
                                <Chip size="lg">
                                    <img src="/images/assets/suitcase.fill@4x.png" alt="suitcase"
                                         style={{width: "15px"}}/>
                                    <Chip.Label className="auto-capitalise">{userDetails.recruiter.title}</Chip.Label>
                                </Chip>
                            )}
                            <Button
                                style={{ width: "32px", height: "32px", background: "var(--secondary-background-color)" }}
                                className="dark"
                                isIconOnly
                                onClick={() => setIsEditOpen(true)}>
                                <img src="/images/assets/pencil@4x.png" style={{ width: "16px", filter: "invert(0.3)" }} alt="pencil"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <br/><br/>

                {/* Admin Fields */}
                {userDetails.role == "ADMIN" && (
                    <>
                       <Dashboard users={users} roadmaps={roadmaps}/>
                    </>
                )}

                {/* Student Fields */}
                {userDetails.role == "STUDENT" && (
                    <>
                        <h4 className="container-label">About</h4>

                        <div className="container-padded">
                            <div>
                                <label className="label-small">Major</label>
                                <p className="auto-capitalise">{userDetails.student.student_major}</p>
                            </div>
                            <div className="mb-3">
                                <label className="label-small">Year</label>
                                <p className="auto-capitalise">{userDetails.student.graduating_year}</p>
                            </div>
                            <div className="mb-3">
                                <label className="label-small">University</label>
                                <p className="auto-capitalise">{userDetails.student.uni_name}</p>
                            </div>
                        </div>

                        <br/><br/>

                        <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                            <h4 className="container-label">Curriculum Vitae</h4>
                            {(userDetails as Student).cv ? (
                                <Button style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark">
                                    <img src="/images/assets/pencil@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
                                </Button>
                            ) : (
                                <Button style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark" isIconOnly onClick={() => CVFormOverlayState.open()}>
                                    <img src="/images/assets/plus@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="plus"/>
                                </Button>
                            )}
                        </div>

                        <div className="container-padded">
                            {userDetails.student.cv ? (
                                <>
                                    <div>
                                        <label className="label-small">Professional Summary</label>
                                        <p className="auto-capitalise">{userDetails.student.cv.description}</p>
                                    </div>
                                    <div>
                                        <label className="label-small">Past Experiences</label>
                                        <p style={{whiteSpace: "pre-wrap"}}>{userDetails.student.cv.past_experiences}</p>
                                    </div>
                                    <div>
                                        <label className="label-small">Projects</label>
                                        <p style={{whiteSpace: "pre-wrap"}}>{userDetails.student.cv.projects}</p>
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted">You don't have a CV</p>
                            )}
                        </div>

                        <br/><br/>

                        <h4 className="container-label">Jobs You Applied For</h4>

                        <div className="container-padded">
                            <div className="full-width" style={{display: "grid", justifyContent: "start", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 0.2fr))", gap: "50px"}}>
                                {!applicationList.length ? (
                                    <h2 className="text-xl font-bold text-gray-400">You haven't applied for anything.</h2>
                                ) : (
                                    applicationList.map((application: Application, index: number) => {
                                        if (!application.job_posting) return null;
                                        return (
                                            <div key={index} style={{display: "grid", gap: "10px", background: "var(--secondary-background-color)", gridTemplateColumns: "repeat(2, 1fr)", padding: "20px", borderRadius: "25px"}}>
                                                <div>
                                                    <label className="label-small">Applied</label>
                                                    <p className="auto-capitalise">{application.application_date.toString().substring(0, 10)}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="label-small">Job Position</label>
                                                    <p className="auto-capitalise">{application.job_posting.job_name + " - " + application.job_posting.company?.name}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="label-small">Phone Number</label>
                                                    <p className="auto-capitalise">{application.phone_number}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Recruiter Fields */}
                {userDetails.role == "RECRUITER" && (
                    <>
                        <h4 className="container-label">Works At</h4>

                        <div className="container-padded">
                            {/*{userDetails.recruiter.companies && userDetails.recruiter?.companies?.length || 0 ? (*/}
                            {userDetails.recruiter?.company?.length > 0 ? (
                                <Table variant="secondary">
                                    <Table.ResizableContainer>
                                        <Table.Content aria-label="Team members" className="min-w-[600px]">
                                            <Table.Header>
                                                <Table.Column isRowHeader>Logo<Table.ColumnResizer/></Table.Column>
                                                <Table.Column isRowHeader>Name<Table.ColumnResizer/></Table.Column>
                                                <Table.Column>Industry<Table.ColumnResizer/></Table.Column>
                                                <Table.Column>Page<Table.ColumnResizer/></Table.Column>
                                                <Table.Column>Address<Table.ColumnResizer/></Table.Column>
                                            </Table.Header>
                                            <Table.Body>
                                                {userDetails.recruiter.company.map((company: Company, index: number) => (
                                                    <Table.Row key={index}>
                                                        <Table.Cell>
                                                            {company.logo ? (
                                                                <img
                                                                    src={`http://127.0.0.1:8000/storage/${company.logo}`}
                                                                    alt={company.name}
                                                                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                                                />
                                                            ) : (
                                                                <span className="text-gray-400">No logo</span>
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>{company.name}</Table.Cell>
                                                        <Table.Cell>{company.industry}</Table.Cell>
                                                        <Table.Cell>
                                                            <a
                                                                href={company.websiteurl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                {company.websiteurl}
                                                            </a>
                                                        </Table.Cell>
                                                        <Table.Cell>{company.location_ofhq}</Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table.Content>
                                    </Table.ResizableContainer>
                                </Table>
                            ) : (
                                <h1 className="text-gray-400">— You're not working for any company.</h1>
                            )}
                        </div>
                    </>
                )}

                <br/><br/>
            </div>

            {/*-------------profile edit-----------------*/}
            <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
                <Modal.Backdrop variant="blur" isDismissable={true}>
                    <Modal.Container>
                        <Modal.Dialog className="max-w-xl">
                            <Modal.CloseTrigger onClick={() => setIsEditOpen(false)}/>
                            <Modal.Header>
                                <Modal.Heading>Edit Profile</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="space-y-4" style={{paddingTop: "20px"}}>
                                <div className="full-width flex flex-col gap-6">

                                    <div className="flex flex-row gap-4">
                                        <div className="full-width">
                                            <label className="flex label-small mb-1">First Name</label>
                                            <input
                                                type="text"
                                                className="text-sm"
                                                value={editForm.f_name}
                                                onChange={e => setEditForm(p => ({ ...p, f_name: e.target.value }))}
                                            />
                                        </div>
                                        <div className="full-width">
                                            <label className="flex label-small mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                className="text-sm"
                                                value={editForm.l_name}
                                                onChange={e => setEditForm(p => ({ ...p, l_name: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex label-small mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="text-sm"
                                            value={editForm.email}
                                            onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                                        />
                                    </div>

                                    {userDetails.role === "STUDENT" && (
                                        <>
                                            <div>
                                                <label className="flex label-small mb-1">Major</label>
                                                <input
                                                    type="text"
                                                    value={editForm.student_major}
                                                    onChange={e => setEditForm(p => ({ ...p, student_major: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="flex label-small mb-1">Faculty</label>
                                                <input
                                                    type="text"
                                                    value={editForm.faculty}
                                                    onChange={e => setEditForm(p => ({ ...p, faculty: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="flex label-small mb-1">University</label>
                                                <input
                                                    type="text"
                                                    value={editForm.uni_name}
                                                    onChange={e => setEditForm(p => ({ ...p, uni_name: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="flex label-small mb-1">Graduating Year</label>
                                                <input
                                                    type="text"
                                                    value={editForm.graduating_year}
                                                    onChange={e => setEditForm(p => ({ ...p, graduating_year: e.target.value }))}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {userDetails.role === "RECRUITER" && (
                                        <div>
                                            <label className="flex label-small mb-1">Title</label>
                                            <input
                                                type="text"
                                                className="text-sm"
                                                value={editForm.title}
                                                onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Modal.Body>
                            <AlertDialog.Footer className="flex justify-end gap-6 mt-8">
                                <Button className="full-width p-3" slot="close" variant="tertiary" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button className="full-width p-3" onClick={saveProfile} isDisabled={editLoading}>
                                    {editLoading ? "Saving..." : "Save"}
                                </Button>
                            </AlertDialog.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            <CVForm overlayState={CVFormOverlayState}/>
        </>
    );
}
