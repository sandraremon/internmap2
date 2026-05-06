import "../CSS/jobPosting.css"
import "../CSS/InternMapHomepage.css";
import {Avatar, Checkbox, cn, type Key, type SortDescriptor, Tabs, Toast, useOverlayState} from "@heroui/react";
import { Table } from '@heroui/react';
import React, {useMemo, useState} from "react";
import {Button , Alert} from "@heroui/react";
import {useFetcher} from "react-router";
import {AlertDialog} from "@heroui/react";
import type {Roadmap} from "../../Model/Roadmap";
import {Icon} from "@iconify/react";
import RoadMapEdit from "../FrontendWebpages/RoadMapUpdate";

function SortableColumnHeader({children, sortDirection}: { children: React.ReactNode; sortDirection?: "ascending" | "descending"; }) {
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

export default function Dashboard({users , roadmaps}: {users : User[], roadmaps : Roadmap[]}) {
    const fetcher = useFetcher();
    const roadmapFormOverlayState = useOverlayState({defaultOpen: false});
    const [roadmapToSmite, setRoadmapToSmite] = useState<Roadmap | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<number | null>(null);
    const [roadmapSortDescriptor, setRoadmapSortDescriptor] = useState<SortDescriptor>({column: "name", direction: "ascending"});
    const [isRoadmapDialogOpen, setIsRoadmapDialogOpen] = useState(false);
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
    const [userToSmite, setUserToSmite] = useState<User | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(new Set());
    const [selectedRoadmapKeys, setSelectedRoadmapKeys] = useState<"all" | Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "f_name", direction: "ascending"});
    const [showAdminError, setShowAdminError] = useState(false);
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
    return (

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
                                            onSortChange={setSortDescriptor}>
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
                                                {sortedUsers.map((user) => {
                                                    return (
                                                        <Table.Row key={user.id} id={user.id}>
                                                            <Table.Cell className="pr-0">
                                                                <Checkbox aria-label={`Select ${user.f_name}`}
                                                                          slot="selection" variant="secondary">
                                                                    <Checkbox.Control><Checkbox.Indicator/></Checkbox.Control>
                                                                </Checkbox>
                                                            </Table.Cell>
                                                            <Table.Cell className="font-medium">
                                                                <div className="flex items-center gap-2">
                                                                    #{user.id.toString()}
                                                                    <Button isIconOnly size="sm" variant="ghost"
                                                                            onPress={() => navigator.clipboard.writeText(user.id.toString())}>
                                                                        <Icon className="size-4 text-muted"
                                                                              icon="gravity-ui:copy"/>
                                                                    </Button>
                                                                </div>
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar size="sm">
                                                                        <Avatar.Fallback>{`${user.f_name?.[0] ?? ""}${user.l_name?.[0] ?? ""}`}</Avatar.Fallback>
                                                                    </Avatar>
                                                                    <div className="flex flex-col">
                                                                        <span
                                                                            className="text-xs">{user.f_name} {user.l_name}</span>
                                                                        <span
                                                                            className="text-xs text-muted">{user.email}</span>
                                                                    </div>
                                                                </div>
                                                            </Table.Cell>
                                                            <Table.Cell className="min-w-52">{user.role}</Table.Cell>
                                                            <Table.Cell>
                                                                <div className="flex items-center justify-end gap-1">

                                                                    <Button isIconOnly size="sm" variant="danger-soft"
                                                                            onPress={() => {
                                                                                setUserToSmite(user);
                                                                                setIsDialogOpen(true);
                                                                            }}>
                                                                        <Icon className="size-4"
                                                                              icon="gravity-ui:trash-bin"/>
                                                                    </Button>
                                                                </div>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })}
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
                                    Delete Selection
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
                                                }}>Delete</Button>
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
                                                }}>Delete</Button>
                                            </AlertDialog.Footer>
                                        </AlertDialog.Dialog>
                                    </AlertDialog.Container>
                                </AlertDialog.Backdrop>
                            </AlertDialog>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>

            <RoadMapEdit overlayState={roadmapFormOverlayState} roadmapId={selectedRoadmapId} />
        </>
    );
}
