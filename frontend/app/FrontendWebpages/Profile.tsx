import { IndexHeader} from "./fragments/IndexHeaderAndFooter";
import {Button, Chip, Table} from "@heroui/react";
import "../app.css";
import "../CSS/Universal.css";

export default function Profile({userDetails}: { userDetails: User}) {
    console.log(userDetails);
    console.log(userDetails.student.applications);

    let applicationList: Application[] = (userDetails.student.applications ? userDetails.student.applications : []);
    //let applicationList: Application[] =
        //userDetails?.student?.applications ?? [];
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
            //     if (applicationList[i].jobPosting.jobName == applicationList[j].jobPosting.jobName &&
            //         applicationList[i].jobPosting.company.name == applicationList[j].jobPosting.company.name) {
            //         applicationList.splice(j, 1);
            //     }
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
                            {(userDetails as Student).cv ? (<Button style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark" isIconOnly>
                                <img src="/images/assets/pencil@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
                            </Button>) : (<Button style={{width: "32px", height: "32px", background: "var(--secondary-background-color)"}} className="dark" isIconOnly>
                                <img src="/images/assets/plus@4x.png" style={{width: "16px", filter: "invert(0.3)"}} alt="pencil"/>
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

                {userDetails.role == "ADMIN" && (
                    <div className="flex items-center justify-center" style={{height: "52vh"}}>
                        <h1 className="label-placeholder">We don't have anything else to show</h1>
                    </div>
                )}

                <br/><br/>
            </div>
            {/*<IndexFooter/>*/}
        </>
    )
}
