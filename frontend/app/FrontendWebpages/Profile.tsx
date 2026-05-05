import {IndexFooter, IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, Chip, type Key, Table, useOverlayState, Tabs, Checkbox, Alert, cn} from "@heroui/react";
import "../app.css";
import "../CSS/Universal.css";
import {useNavigate} from 'react-router-dom';
import CVForm from "./CV";
import {useFetcher} from "react-router";
import {AlertDialog} from "@heroui/react";
import {Avatar} from "@heroui/react";
import {Icon} from "@iconify/react";
import React, {useState, useMemo} from "react";
import type {Roadmap} from "../../Model/Roadmap";
import type {Selection, SortDescriptor} from "@heroui/react";
import ApplicationForm from "../FrontendWebpages/ApplicationForm";
import RoadMapEdit from "../FrontendWebpages/RoadMapUpdate";
import roadmap from "../FrontendWebpages/Roadmap";

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
    const [roadmapSortDescriptor, setRoadmapSortDescriptor] = useState<SortDescriptor>({column: "name", direction: "ascending"});
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "f_name", direction: "ascending"});
    const [userToSmite, setUserToSmite] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [roadmapToSmite, setRoadmapToSmite] = useState<Roadmap | null>(null);
    const [isRoadmapDialogOpen, setIsRoadmapDialogOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(new Set());
    const [selectedRoadmapKeys, setSelectedRoadmapKeys] = useState<"all" | Set<Key>>(new Set());
    const [showAdminError, setShowAdminError] = useState(false);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<number | null>(null);

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const col = sortDescriptor.column as keyof User;
            const first = String(a[col] ?? "");
            const second = String(b[col] ?? "");
            let cmp = first.localeCompare(second);
            if (sortDescriptor.direction === "descending") cmp *= -1;
            return cmp;
        });
    }, [sortDescriptor, users]);

    const sortedRoadmaps = useMemo(() => {
        return [...roadmaps].sort((a, b) => {
            const col = roadmapSortDescriptor.column as keyof Roadmap;
            const first = String(a[col] ?? "");
            const second = String(b[col] ?? "");
            let cmp = first.localeCompare(second);
            if (roadmapSortDescriptor.direction === "descending") cmp *= -1;
            return cmp;
        });
    }, [roadmapSortDescriptor, roadmaps]);

    // @ts-ignore
    const fetcher = useFetcher();

    const handleDeleteUsers = (selectedUsers: User[]) => {
        const formData = new FormData();
        formData.append("intent", "deleteUsers");
        formData.append("users", JSON.stringify(selectedUsers));
        fetcher.submit(formData, {method: "post", action: "/profile"});
    };

    const handleDeleteRoadmaps = (selectedRoadmaps: Roadmap[]) => {
        const formData = new FormData();
        formData.append("intent", "deleteRoadmaps");
        formData.append("roadmaps", JSON.stringify(selectedRoadmaps));
        fetcher.submit(formData, {method: "post", action: "/profile"});
    };

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
                                <Chip style={{gap: "4px"}} size="lg">
                                    <img src="/images/assets/suitcase.fill@4x.png" alt="suitcase" style={{width: "15px", filter: "invert(0.8)"}}/>
                                    <Chip.Label className="auto-capitalise">{userDetails.recruiter.title}</Chip.Label>
                                </Chip>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <br/><br/>

                {/* Admin Fields */}
                {userDetails.role == "ADMIN" && (
                    <>
                        {showAdminError && (
                            <Alert status="danger">
                                <Alert.Indicator/>
                                <Alert.Content>
                                    <Alert.Title>Cannot delete admin user</Alert.Title>
                                    <Alert.Description>
                                        You selected at least one ADMIN user. This action is blocked.
                                    </Alert.Description>
                                </Alert.Content>
                            </Alert>
                        )}

                        <div className="wrapper">
                            <div id="bb1">
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

                                    {/* Users Tab */}
                                    <Tabs.Panel id="Roadmap">
                                        {users.length === 0 ? (
                                            <a>No users to show</a>
                                        ) : (
                                            <Table>
                                                <Table.ScrollContainer style={{maxHeight: "600px", overflow: "auto"}}>
                                                    <Table.Content
                                                        aria-label="Users table"
                                                        className="min-w-[800px]"
                                                        selectedKeys={selectedKeys}
                                                        selectionMode="multiple"
                                                        sortDescriptor={sortDescriptor}
                                                        onSelectionChange={setSelectedKeys}
                                                        onSortChange={setSortDescriptor}
                                                    >
                                                        <Table.Header>
                                                            <Table.Column className="pr-0">
                                                                <Checkbox aria-label="Select all" slot="selection">
                                                                    <Checkbox.Control><Checkbox.Indicator/></Checkbox.Control>
                                                                </Checkbox>
                                                            </Table.Column>
                                                            <Table.Column allowsSorting isRowHeader className="after:hidden" id="id">
                                                                {({sortDirection}) => <SortableColumnHeader sortDirection={sortDirection}>ID</SortableColumnHeader>}
                                                            </Table.Column>
                                                            <Table.Column allowsSorting id="f_name">
                                                                {({sortDirection}) => <SortableColumnHeader sortDirection={sortDirection}>Member</SortableColumnHeader>}
                                                            </Table.Column>
                                                            <Table.Column allowsSorting id="role">
                                                                {({sortDirection}) => <SortableColumnHeader sortDirection={sortDirection}>Role</SortableColumnHeader>}
                                                            </Table.Column>
                                                            <Table.Column className="text-end">Actions</Table.Column>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {sortedUsers.map((user) => (
                                                                <Table.Row key={user.id} id={user.id}>
                                                                    <Table.Cell className="pr-0">
                                                                        <Checkbox aria-label={`Select ${user.f_name}`} slot="selection" variant="secondary">
                                                                            <Checkbox.Control><Checkbox.Indicator/></Checkbox.Control>
                                                                        </Checkbox>
                                                                    </Table.Cell>
                                                                    <Table.Cell className="font-medium">
                                                                        <div className="flex items-center gap-2">
                                                                            #{user.id.toString()}
                                                                            <Button isIconOnly size="sm" variant="ghost"
                                                                                    onPress={() => navigator.clipboard.writeText(user.id.toString())}>
                                                                                <Icon className="size-4 text-muted" icon="gravity-ui:copy"/>
                                                                            </Button>
                                                                        </div>
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        <div className="flex items-center gap-3">
                                                                            <Avatar size="sm">
                                                                                <Avatar.Fallback>{`${user.f_name?.[0] ?? ""}${user.l_name?.[0] ?? ""}`}</Avatar.Fallback>
                                                                            </Avatar>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-xs">{user.f_name} {user.l_name}</span>
                                                                                <span className="text-xs text-muted">{user.email}</span>
                                                                            </div>
                                                                        </div>
                                                                    </Table.Cell>
                                                                    <Table.Cell className="min-w-52">{user.role}</Table.Cell>
                                                                    <Table.Cell>
                                                                        <div className="flex items-center justify-end gap-1">
                                                                            <Button isIconOnly size="sm" variant="tertiary">
                                                                                <Icon className="size-4" icon="gravity-ui:eye"/>
                                                                            </Button>
                                                                            <Button isIconOnly size="sm" variant="tertiary">
                                                                                <Icon className="size-4" icon="gravity-ui:pencil"/>
                                                                            </Button>
                                                                            <Button isIconOnly size="sm" variant="danger-soft"
                                                                                    onPress={() => {
                                                                                        setUserToSmite(user);
                                                                                        setIsDialogOpen(true);
                                                                                    }}>
                                                                                <Icon className="size-4" icon="gravity-ui:trash-bin"/>
                                                                            </Button>
                                                                        </div>
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            ))}
                                                        </Table.Body>
                                                    </Table.Content>
                                                </Table.ScrollContainer>
                                            </Table>
                                        )}

                                        <p className="text-sm text-muted">
                                            Users Selected:{" "}
                                            <span className="font-medium">
                                                {selectedKeys === "all" ? "All" : (selectedKeys as Set<Key>).size > 0 ? (selectedKeys as Set<Key>).size : "None"}
                                            </span>
                                        </p>

                                        {/* Bulk smite */}
                                        <AlertDialog>
                                            <Button variant="danger" isDisabled={selectedKeys !== "all" && (selectedKeys as Set<Key>).size === 0}>
                                                Smite Selected
                                            </Button>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger/>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger"/>
                                                            <AlertDialog.Heading>Delete selected users permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>This will permanently delete{" "}
                                                                <strong>{selectedKeys === "all" ? "all users" : `${(selectedKeys as Set<Key>).size} user(s)`}</strong>
                                                                {" "}and all of their data. This action cannot be undone.</p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">Cancel</Button>
                                                            <Button slot="close" variant="danger" onPress={() => {
                                                                const selectedUsers = selectedKeys === "all"
                                                                    ? users
                                                                    : users.filter(u => (selectedKeys as Set<Key>).has(u.id));
                                                                if (selectedUsers.some(u => u.role === "ADMIN")) {
                                                                    setShowAdminError(true);
                                                                    setTimeout(() => setShowAdminError(false), 3000);
                                                                    return;
                                                                }
                                                                fetcher.submit({users: JSON.stringify(selectedUsers)}, {method: "POST", encType: "application/json"});
                                                                setSelectedKeys(new Set());
                                                            }}>Smite!</Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>

                                        {/* Single user smite dialog */}
                                        <AlertDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger/>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger"/>
                                                            <AlertDialog.Heading>Delete user permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>This will permanently delete{" "}
                                                                <strong>{userToSmite?.f_name} {userToSmite?.l_name}</strong>
                                                                {" "}and all of their data. This action cannot be undone.</p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">Cancel</Button>
                                                            <Button slot="close" variant="danger" onPress={() => {
                                                                if (!userToSmite) return;
                                                                if (userToSmite.role === "ADMIN") {
                                                                    setShowAdminError(true);
                                                                    setTimeout(() => setShowAdminError(false), 3000);
                                                                    setIsDialogOpen(false);
                                                                    return;
                                                                }
                                                                fetcher.submit({users: JSON.stringify([userToSmite])}, {method: "POST", encType: "application/json"});
                                                                setUserToSmite(null);
                                                                setIsDialogOpen(false);
                                                            }}>Smite!</Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>
                                    </Tabs.Panel>

                                    {/* Roadmaps Tab */}
                                    <Tabs.Panel id="JobPostings">
                                        {roadmaps.length === 0 ? (
                                            <a>No roadmaps to show</a>
                                        ) : (
                                            <Table>
                                                <Table.ScrollContainer style={{maxHeight: "600px", overflow: "auto"}}>
                                                    <Table.Content
                                                        aria-label="Table with selection"
                                                        className="min-w-[600px]"
                                                        selectedKeys={selectedRoadmapKeys}
                                                        selectionMode="multiple"
                                                        sortDescriptor={roadmapSortDescriptor}
                                                        onSelectionChange={setSelectedRoadmapKeys}
                                                        onSortChange={setRoadmapSortDescriptor}
                                                    >
                                                        <Table.Header>
                                                            <Table.Column className="pr-0">
                                                                <Checkbox aria-label="Select all" slot="selection">
                                                                    <Checkbox.Control><Checkbox.Indicator/></Checkbox.Control>
                                                                </Checkbox>
                                                            </Table.Column>
                                                            <Table.Column allowsSorting isRowHeader className="after:hidden" id="name">
                                                                {({sortDirection}) => <SortableColumnHeader sortDirection={sortDirection}>Name</SortableColumnHeader>}
                                                            </Table.Column>
                                                            <Table.Column allowsSorting id="id">
                                                                {({sortDirection}) => <SortableColumnHeader sortDirection={sortDirection}>ID</SortableColumnHeader>}
                                                            </Table.Column>
                                                            <Table.Column className="text-end">Actions</Table.Column>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {sortedRoadmaps.map((roadmap) => (
                                                                <Table.Row key={roadmap.id} id={String(roadmap.id)}>
                                                                    <Table.Cell className="pr-0">
                                                                        <Checkbox aria-label={`Select ${roadmap.name}`} slot="selection" variant="secondary">
                                                                            <Checkbox.Control><Checkbox.Indicator/></Checkbox.Control>
                                                                        </Checkbox>
                                                                    </Table.Cell>
                                                                    <Table.Cell>{roadmap.name}</Table.Cell>
                                                                    <Table.Cell>{roadmap.id}</Table.Cell>
                                                                    <Table.Cell>
                                                                        <div className="flex items-center justify-end gap-1">
                                                                            <Button isIconOnly size="sm" variant="tertiary">
                                                                                <Icon className="size-4" icon="gravity-ui:eye"/>
                                                                            </Button>
                                                                            <Button isIconOnly size="sm" variant="tertiary"
                                                                                    onPress={() => {
                                                                                        setSelectedRoadmapId(roadmap.id);
                                                                                        roadmapFormOverlayState.open();
                                                                                    }}>
                                                                                <Icon className="size-4" icon="gravity-ui:pencil"/>
                                                                            </Button>
                                                                            <Button isIconOnly size="sm" variant="danger-soft"
                                                                                    onPress={() => {
                                                                                        setRoadmapToSmite(roadmap);
                                                                                        setIsRoadmapDialogOpen(true);
                                                                                    }}>

                                                                                <Icon className="size-4" icon="gravity-ui:trash-bin"/>
                                                                            </Button>
                                                                        </div>
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            ))}
                                                        </Table.Body>
                                                    </Table.Content>
                                                </Table.ScrollContainer>
                                            </Table>
                                        )}

                                        <p className="text-sm text-muted">
                                            Roadmaps Selected:{" "}
                                            <span className="font-medium">
                                                {selectedRoadmapKeys === "all" ? "All" : selectedRoadmapKeys.size > 0 ? selectedRoadmapKeys.size : "None"}
                                            </span>
                                        </p>

                                        {/* Bulk smite */}
                                        <AlertDialog>
                                            <Button variant="danger" isDisabled={selectedRoadmapKeys !== "all" && (selectedRoadmapKeys as Set<Key>).size === 0}>
                                                Smite Selected
                                            </Button>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger/>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger"/>
                                                            <AlertDialog.Heading>Delete selected roadmaps permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>This will permanently delete{" "}
                                                                <strong>{selectedRoadmapKeys === "all" ? "all roadmaps" : `${(selectedRoadmapKeys as Set<Key>).size} roadmap(s)`}</strong>
                                                                {" "}and all of their data. This action cannot be undone.</p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">Cancel</Button>
                                                            <Button slot="close" variant="danger" onPress={() => {
                                                                const selectedRoadmaps = selectedRoadmapKeys === "all"
                                                                    ? roadmaps
                                                                    : roadmaps.filter(r => (selectedRoadmapKeys as Set<string>).has(String(r.id)));
                                                                fetcher.submit(
                                                                    {users: "[]", roadmaps: JSON.stringify(selectedRoadmaps)},
                                                                    {method: "POST", encType: "application/json"}
                                                                );
                                                                setSelectedRoadmapKeys(new Set());
                                                            }}>Smite!</Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>

                                        {/* Single roadmap smite dialog */}
                                        <AlertDialog isOpen={isRoadmapDialogOpen} onOpenChange={setIsRoadmapDialogOpen}>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger/>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger"/>
                                                            <AlertDialog.Heading>Delete roadmap permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>This will permanently delete{" "}
                                                                <strong>{roadmapToSmite?.name}</strong>
                                                                {" "}and all of its data. This action cannot be undone.</p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">Cancel</Button>
                                                            <Button slot="close" variant="danger" onPress={() => {
                                                                if (!roadmapToSmite) return;
                                                                fetcher.submit(
                                                                    {users: "[]", roadmaps: JSON.stringify([roadmapToSmite])},
                                                                    {method: "POST", encType: "application/json"}
                                                                );
                                                                setRoadmapToSmite(null);
                                                                setIsRoadmapDialogOpen(false);
                                                            }}>Smite!</Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        </div>
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
                            <h4 className="container-label">Circulmn Vitae</h4>
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
                            {userDetails.recruiter.companies && userDetails.recruiter?.companies?.length || 0 ? (
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
                            ) : (
                                <h1 className="text-gray-400">— You're not working for any company.</h1>
                            )}
                        </div>
                    </>
                )}

                <br/><br/>
            </div>

            <CVForm overlayState={CVFormOverlayState}/>
            <RoadMapEdit overlayState={roadmapFormOverlayState} roadmapId={selectedRoadmapId} />
        </>
    );
}
