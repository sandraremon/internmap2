import {IndexFooter, IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, Chip, type Key, Table, useOverlayState, Tabs, Checkbox, Alert} from "@heroui/react";
import "../app.css";
import "../CSS/Universal.css";
import { useNavigate } from 'react-router-dom';
import CVForm from "./CV";
import React, {useState} from "react";
import {useFetcher} from "react-router";
import {AlertDialog} from "@heroui/react";
import type {Roadmap} from "../../Model/Roadmap";

export default function Profile({userDetails, roadmaps,users}: {users : User[] ,userDetails: User, roadmaps : Roadmap[]}) {

// For deleting users

    // @ts-ignore
    const fetcher = useFetcher();

    const handleDeleteUsers = (selectedUsers: User[]) => {
        const formData = new FormData();
        formData.append("intent", "deleteUsers");
        formData.append("users", JSON.stringify(selectedUsers));
        fetcher.submit(formData, { method: "post", action: "/profile" });
    };

// For deleting roadmaps
    const handleDeleteRoadmaps = (selectedRoadmaps: Roadmap[]) => {
        const formData = new FormData();
        formData.append("intent", "deleteRoadmaps");
        formData.append("roadmaps", JSON.stringify(selectedRoadmaps));
        fetcher.submit(formData, { method: "post", action: "/profile" });
    };
    console.log(userDetails);
    // console.log(userDetails.student.applications);
    const navigate = useNavigate();
    const CVFormOverlayState = useOverlayState({defaultOpen: false});
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(new Set());
    const [selectedRoadmapKeys, setSelectedRoadmapKeys] = useState<"all" | Set<Key>>(new Set());

    const [showAdminError, setShowAdminError] = useState(false);

    // let applicationList: Application[] = userDetails.role === "STUDENT" ? (userDetails.student.applications ? userDetails.student.applications : []);
    const applicationList: Application[] =
        userDetails.role === "STUDENT"
            ? userDetails.student?.applications ?? []
            : [];
    if (applicationList != null) {
        applicationList.sort((e, f) => {
            if (e.application_date < f.application_date) {
                return 1;
            } else if (e.application_date === f.application_date) {
                return 0;
            } else {
                return -1;
            }
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
                         style={{display: "flex", width: "100px", height: "100px", borderRadius: "100%"}} alt="Unstable Logo"/>
                    <div style={{gap: "7px", display: "flex", flexDirection: "column"}}>
                        <section>
                            <p className="auto-capitalise text-3xl font-bold">{userDetails.f_name + " " + userDetails.l_name}</p>
                            <p>{userDetails.email}</p>
                        </section>
                        <div className="flex items-center gap-4 flex-row">
                            <Chip style={{gap: "4px"}} size="lg" >
                                <img src="/images/assets/calendar@4x.png" alt="calendar"
                                     style={{width: "17px", filter: "invert(0.8)"}}/>

                                <Chip.Label>{userDetails.created_at?.toString().substring(0, 4) ?? "N/A"}</Chip.Label>
                            </Chip>
                            <Chip style={{gap: "4px"}} size="lg">
                                <img src="/images/assets/person.fill@4x.png" alt="person"
                                     style={{width: "15px", filter: "invert(0.8)"}}/>
                                <Chip.Label>
                                    {userDetails?.role
                                        ? userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1).toLowerCase()
                                        : "N/A"}
                                </Chip.Label>
                            </Chip>

                            {userDetails.role == "RECRUITER" && (
                                <Chip style={{gap: "4px"}} size="lg">
                                    <img src="/images/assets/suitcase.fill@4x.png" alt="suitcase"
                                         style={{width: "15px", filter: "invert(0.8)"}}/>
                                    <Chip.Label className="auto-capitalise">{userDetails.recruiter.title}</Chip.Label>
                                </Chip>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>

                <br/><br/>
                {/*// <!-- Admin Fields -->*/}
                {userDetails.role == "ADMIN" && (
                    <>


                    {showAdminError && (
                        <Alert status="danger">
                            <Alert.Indicator />
                            <Alert.Content>
                                <Alert.Title>Cannot delete admin user</Alert.Title>
                                <Alert.Description>
                                    You selected at least one ADMIN user. This action is blocked.
                                </Alert.Description>
                            </Alert.Content>
                        </Alert>
                    )}

                    <div className="wrapper">

                        <div id="bb1" >

                            <Tabs className="max-w">
                                <Tabs.ListContainer>
                                    <Tabs.List aria-label="View Selector">

                                        <Tabs.Tab id="Roadmap">
                                            Users
                                            <Tabs.Indicator/>
                                        </Tabs.Tab>

                                        <Tabs.Tab id="JobPostings">
                                            RoadMaps
                                            <Tabs.Indicator/>
                                        </Tabs.Tab>
                                    </Tabs.List>
                                </Tabs.ListContainer>

                                <Tabs.Panel id="Roadmap">

                                    <div >


                                        {users.length == 0 ?
                                            <a> No users to show </a> :
                                            <div>

                                                <div  className="flex flex-col gap-3">
                                                    <Table >
                                                        <Table.ScrollContainer  style={{ maxHeight: "600px", overflow: "auto"  }}>
                                                            <Table.Content

                                                                aria-label="Table with selection"
                                                                className="min-w-[600px]"
                                                                selectedKeys={selectedKeys}
                                                                selectionMode="multiple"
                                                                onSelectionChange={setSelectedKeys}>
                                                                <Table.Header>
                                                                    <Table.Column className="pr-0">
                                                                        <Checkbox aria-label="Select all" slot="selection">
                                                                            <Checkbox.Control>
                                                                                <Checkbox.Indicator />
                                                                            </Checkbox.Control>
                                                                        </Checkbox>
                                                                    </Table.Column>
                                                                    <Table.Column isRowHeader>FName</Table.Column>
                                                                    <Table.Column isRowHeader>LName</Table.Column>

                                                                    <Table.Column>Role</Table.Column>
                                                                    <Table.Column>ID</Table.Column>
                                                                    <Table.Column>Email</Table.Column>
                                                                </Table.Header>
                                                                <Table.Body>
                                                                    {users.map((user) => (
                                                                        <Table.Row key={user.id} id={user.email}>
                                                                            <Table.Cell className="pr-0">
                                                                                <Checkbox
                                                                                    aria-label={`Select ${user.fname}`}
                                                                                    slot="selection"
                                                                                    variant="secondary"
                                                                                >
                                                                                    <Checkbox.Control>
                                                                                        <Checkbox.Indicator />
                                                                                    </Checkbox.Control>
                                                                                </Checkbox>
                                                                            </Table.Cell>
                                                                            <Table.Cell>{user.f_name}</Table.Cell>
                                                                            <Table.Cell>{user.l_name}</Table.Cell>

                                                                            <Table.Cell>{user.role}</Table.Cell>
                                                                            <Table.Cell>{user.id}</Table.Cell>
                                                                            <Table.Cell>{user.email}</Table.Cell>
                                                                        </Table.Row>
                                                                    ))}
                                                                </Table.Body>
                                                            </Table.Content>
                                                        </Table.ScrollContainer>
                                                    </Table>

                                                </div>
                                            </div>
                                        }




                                    </div>
                                    <p className="text-sm text-muted">
                                        Users Selected:{" "}
                                        <span className="font-medium">
                                                     {selectedKeys === "all"  ? "All"  : selectedKeys.size > 0  ? selectedKeys.size : "None"}
                                                </span>

                                    </p>
                                    <div>

                                        <AlertDialog>
                                            <Button variant="danger">Smite</Button>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger />
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger" />
                                                            <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>
                                                                This will permanently delete <strong>This user</strong> and all of his
                                                                data. This action cannot be undone.
                                                            </p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">
                                                                Cancel
                                                            </Button>

                                                            <Button slot="close" variant="danger"   onPress={() => {

                                                                const selectedUsers =
                                                                    selectedKeys === "all" ? users : users.filter(u => (selectedKeys as Set<string>).has(u.email));

                                                                if(selectedUsers.some (u => u.role === "ADMIN")) {
                                                                    setShowAdminError(true);
                                                                    setTimeout(() => {
                                                                        setShowAdminError(false);
                                                                    }, 3000);
                                                                    return;
                                                                }
                                                                console.log("selectedKeys:", selectedKeys);        // what keys are selected
                                                                console.log("selectedUsers:", selectedUsers);      // are users found?
                                                                console.log("all users:", users);                  // what does users array look like?

                                                                fetcher.submit(
                                                                    { users: JSON.stringify(selectedUsers) },
                                                                    { method: "POST", encType: "application/json" }
                                                                );

                                                                setSelectedKeys(new Set())
                                                            }}>
                                                                Smite!
                                                            </Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>

                                        <button>

                                        </button>
                                    </div>

                                </Tabs.Panel>

                                <Tabs.Panel id="JobPostings">

                                    <div >

                                        {roadmaps.length == 0 ?
                                            <a> No roadmaps to show </a> :
                                            <div>

                                                <div  className="flex flex-col gap-3">
                                                    <Table >
                                                        <Table.ScrollContainer  style={{ maxHeight: "600px", overflow: "auto"}}>
                                                            <Table.Content

                                                                aria-label="Table with selection"
                                                                className="min-w-[600px]"
                                                                selectedKeys={selectedRoadmapKeys}
                                                                selectionMode="multiple"
                                                                onSelectionChange={setSelectedRoadmapKeys}>
                                                                <Table.Header>
                                                                    <Table.Column className="pr-0">
                                                                        <Checkbox aria-label="Select all" slot="selection">
                                                                            <Checkbox.Control>
                                                                                <Checkbox.Indicator />
                                                                            </Checkbox.Control>
                                                                        </Checkbox>
                                                                    </Table.Column>
                                                                    <Table.Column isRowHeader>Name</Table.Column>
                                                                    <Table.Column isRowHeader>ID</Table.Column>
                                                                </Table.Header>
                                                                <Table.Body>
                                                                    {roadmaps.map((roadmap) => (
                                                                        <Table.Row key={roadmap.id} id={String(roadmap.id)}>
                                                                            <Table.Cell className="pr-0">
                                                                                <Checkbox
                                                                                    aria-label={`Select ${roadmap.name}`}
                                                                                    slot="selection"
                                                                                    variant="secondary"
                                                                                >
                                                                                    <Checkbox.Control>
                                                                                        <Checkbox.Indicator />
                                                                                    </Checkbox.Control>
                                                                                </Checkbox>
                                                                            </Table.Cell>
                                                                            <Table.Cell>{roadmap.name}</Table.Cell>
                                                                            <Table.Cell>{roadmap.id}</Table.Cell>
                                                                        </Table.Row>
                                                                    ))}
                                                                </Table.Body>
                                                            </Table.Content>
                                                        </Table.ScrollContainer>
                                                    </Table>

                                                </div>
                                            </div>
                                        }

                                    </div>
                                    <p className="text-sm text-muted">
                                        Roadmaps Selected:{" "}
                                        <span className="font-medium">
                                    {selectedRoadmapKeys === "all" ? "All" : selectedRoadmapKeys.size > 0 ? selectedRoadmapKeys.size : "None"}
                                </span>
                                    </p>
                                    <div>

                                        <AlertDialog>
                                            <Button variant="danger">Smite</Button>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger />
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger" />
                                                            <AlertDialog.Heading>Delete roadmap permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>
                                                                This will permanently delete <strong>This roadmap</strong> and all of its
                                                                data. This action cannot be undone.
                                                            </p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">
                                                                Cancel
                                                            </Button>

                                                            <Button slot="close" variant="danger" onPress={() => {
                                                                const selectedRoadmaps = selectedRoadmapKeys === "all"
                                                                    ? roadmaps
                                                                    : roadmaps.filter(r => (selectedRoadmapKeys as Set<string>).has(String(r.id)));

                                                                fetcher.submit(
                                                                    { users: "[]", roadmaps: JSON.stringify(selectedRoadmaps) }
                                                                    ,
                                                                    { method: "POST", encType: "application/json" }
                                                                );

                                                                setSelectedRoadmapKeys(new Set());
                                                            }}>
                                                                Smite!
                                                            </Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>

                                        <button>

                                        </button>
                                    </div>

                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>
{/*<IndexFooter/>*/}
                        </>
                    )}

                {/*// <!-- Student Fields -->*/}
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

                        <br />
                        <br />

                        {/*// <!-- CV Section -->*/}
                        <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                            <h4 className="container-label">Circulmn Vitae</h4>
                            {(userDetails as Student).cv ? (<Button  style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark"  >

                                <img src="/images/assets/pencil@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
                                {/*const CVFormOverlayState = useOverlayState({defaultOpen: false});*/}
                            </Button>) : (<Button style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark" isIconOnly  onClick={() => CVFormOverlayState.open()}>
                                <img src="/images/assets/plus@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="plus"/>
                            </Button>)}
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

                        {/*// <!-- Applications -->*/}
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
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/*// <!-- Recruiter Fields -->*/}
                {userDetails.role == "RECRUITER" && (
                    <>
                        <h4 className="container-label">Works At</h4>

                        <div className="container-padded">
                            {/*// <!-- If a recruiter has one or more companies -->*/}

                            {userDetails.recruiter.companies && userDetails.recruiter?.companies?.length || 0 ? (
                                <>
                                    <Table variant="secondary">
                                        <Table.ResizableContainer>
                                            <Table.Content aria-label="Team members" className="min-w-[600px]">
                                                <Table.Header>
                                                    <Table.Column isRowHeader>Name<Table.ColumnResizer/></Table.Column>
                                                    <Table.Column>Industry<Table.ColumnResizer/></Table.Column>
                                                    <Table.Column>Page<Table.ColumnResizer/></Table.Column>
                                                    <Table.Column>Address<Table.ColumnResizer/></Table.Column>
                                                </Table.Header>
                                                <Table.Body>
                                                    {userDetails.recruiter.companies.map((company: Company, index: number) => (
                                                        <Table.Row key={index}>
                                                            <Table.Cell>{company.name}</Table.Cell>
                                                            <Table.Cell>{company.industry}</Table.Cell>
                                                            <Table.Cell>{company.websiteurl.toString()}</Table.Cell>
                                                            <Table.Cell>{company.location_ofhq}</Table.Cell>
                                                        </Table.Row>
                                                    ))}
                                                </Table.Body>
                                            </Table.Content>
                                        </Table.ResizableContainer>
                                    </Table>
                                </>
                            ) : (
                                <h1 className="text-gray-400">
                                    — You're not working for any company.
                                </h1>
                            )}
                        </div>
                    </>
                )}

                {/*{userDetails.role == "ADMIN" && (*/}
                {/*    <div className="flex items-center justify-center" style={{height: "52vh"}}>*/}
                {/*        <h1 className="label-placeholder">We don't have anything else to show</h1>*/}
                {/*    </div>*/}
                {/*)}*/}

                <br/><br/>
            </div>
            {/*<IndexFooter/>*/}
            <CVForm overlayState={CVFormOverlayState}/>
        </>
    )
}
