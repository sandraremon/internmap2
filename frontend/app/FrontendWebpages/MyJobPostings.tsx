import { IndexHeader } from "./fragments/IndexHeaderAndFooter";
import { Chip } from "@heroui/react";
import "../app.css";
import "../CSS/Universal.css";
import { useNavigate } from 'react-router-dom';

export default function MyJobPostings({ jobPostings }: { jobPostings: JobPosting[] }) {
    const navigate = useNavigate();
    console.log(jobPostings);

    if (jobPostings.length > 0) {
        jobPostings.sort((j1, j2) =>
            j1.date_posted < j2.date_posted ? 1 : j1.date_posted === j2.date_posted ? 0 : -1
        );

        for (let i = 0; i < jobPostings.length; i++) {
            for (let j = jobPostings.length - 1; j > i; j--) {
                if (
                    jobPostings[i] && jobPostings[j] &&
                    jobPostings[i].job_name === jobPostings[j].job_name &&
                    jobPostings[i].company?.name === jobPostings[j].company?.name
                ) {
                    jobPostings.splice(j, 1);
                }
            }
        }
    }

    return (
        <>
            <IndexHeader />
            <div style={{padding: "35px", maxWidth: "720px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: 600, marginBottom: "4px" }}>
                    My Job Postings
                </h1>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
                    {jobPostings.length} Result{jobPostings.length !== 1 ? "s" : ""}
                </p>

            </div>
                {jobPostings.length === 0 ? (
                    <div className="flex full-width " style={{height: "52vh"}}>
                        <h1 className="label-placeholder">You Haven't Post Anything.</h1>
                        <h6 className="label-placeholder" style={{fontSize: "18px", fontWeight: "normal"}}> Compose a job to see the applicants here.</h6>
                    </div>
                ) : (
                    <div style={{padding: "35px", maxWidth: "720px" }}>
                        {jobPostings.map((job, idx) => (
                        <div
                            key={idx}
                            style={{
                                borderRadius: "30px",
                                background: "rgba(44, 44, 44, 0.85)",
                                boxShadow: "0 0 40px 0 rgba(0, 0, 0, 0.17)",
                                backdropFilter: "blur(30px)",
                                padding: "20px 24px",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "16px",
                            }}>
                            <div>
                                <p style={{ fontWeight: 600, fontSize: "16px", margin: "0 0 6px" }}>
                                    {job.job_name}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                                        {job.company?.name}
                                    </span>

                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/job/${job.id}/applicants`)}
                                style={{
                                    background: "rgba(44, 44, 44, 0.85)",
                                    boxShadow: "0 0 40px 0 rgba(0, 0, 0, 0.17)",
                                    borderRadius: "19px",
                                    padding: "9px 16px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "var(--color-text-primary)",
                                    backdropFilter: "blur(30px)",
                                }}
                            >
                                View Applicants
                            </button>
                        </div>
                    ))}
                    </div>
                )}
        </>
    );
}
