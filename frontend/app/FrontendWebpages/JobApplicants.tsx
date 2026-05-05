import { useState } from "react";
import { IndexHeader } from "./fragments/IndexHeaderAndFooter";
import { Chip } from "@heroui/react";
import "../app.css";
import "../CSS/Universal.css";

export default function MyJobApplicants({ applications }: { applications: Application[] }) {
    // since its a list of application array and i need each of them to need its own useState
    //and i need to track them all at once and each id maps to its status
    const [statuses, setStatuses] = useState<Record<string, string>>(
        Object.fromEntries(applications.map(a => [String(a.id), a.status as string ?? "pending"]))
        //converts the pairs into an actual object/dictionary
    );

    async function updateStatus(applicationId: string, status: "accepted" | "rejected") {
        await fetch(`http://127.0.0.1:8000/api/application/${applicationId}/status`, {
            method: "PATCH",//patch to go change from the DB
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        setStatuses(prev => ({ ...prev, [applicationId]: status }));
        //...prev is the old statuses and changes it to the new status
    }

    return (
        <>
            <IndexHeader />
            <main style={{
                padding: "24px",
                maxWidth: "720px",
                margin: "0 auto" }}>
                <h1 style={{
                    fontSize: "26px",
                    fontWeight: 600,
                    marginBottom: "4px" }}>
                    Applicants
                </h1>
                <p style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    marginBottom: "24px" }}>
                    {applications.length} Result{applications.length !== 1 ? "s" : ""}
                </p>

                {applications.length === 0 ? (
                    <p style={{ color: "var(--color-text-secondary)" }}>No applicants yet.</p>
                ) : (
                    applications.map((app) => {
                        const status = statuses[String(app.id)];
                        const decided = status === "accepted" || status === "rejected";

                        return (
                            <div
                                key={String(app.id)}
                                style={{
                                    borderRadius: "60px",
                                    background: "rgba(44, 44, 44, 0.85)",
                                    boxShadow: "0 0 40px 0 rgba(0, 0, 0, 0.17)",
                                    backdropFilter: "blur(30px)",
                                    padding: "20px 28px",
                                    marginBottom: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "16px",
                                }}
                            >
                                <div>
                                    <p style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        margin: "0 0 6px" }}>
                                        {app.f_name} {app.l_name}
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flexWrap: "wrap" }}>

                                        <span style={{
                                            fontSize: "13px",
                                            color: "var(--color-text-secondary)" }}>
                                            {app.email}
                                        </span>

                                        <span style={{
                                            fontSize: "13px",
                                            color: "var(--color-text-secondary)" }}>
                                            {app.phone_number}
                                        </span>

                                        {decided && (
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={status === "accepted" ? "success" : "danger"}
                                            >
                                                {status}
                                            </Chip>
                                        )}
                                    </div>
                                    {app.student?.cv && (
                                        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <div>
                                                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Description</span>
                                                <p style={{ margin: "2px 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>{app.student.cv.description}</p>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Past Experiences</span>
                                                <p style={{ margin: "2px 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>{app.student.cv.past_experiences}</p>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Projects</span>
                                                <p style={{ margin: "2px 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>{app.student.cv.projects}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!decided && (
                                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                                        <button
                                            onClick={() => updateStatus(String(app.id), "accepted")}
                                            style={{
                                                borderRadius: "99px",
                                                padding: "9px 18px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                border: "0.5px solid rgba(34,197,94,0.4)",
                                                background: "rgba(34,197,94,0.15)",
                                                color: "#4ade80",
                                            }}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus(String(app.id), "rejected")}
                                            style={{
                                                borderRadius: "99px",
                                                padding: "9px 18px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                border: "0.5px solid rgba(239,68,68,0.4)",
                                                background: "rgba(239,68,68,0.15)",
                                                color: "#f87171",
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </main>
        </>
    );
}
