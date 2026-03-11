<!DOCTYPE html>
<html lang="en">
<head>
    <title> InternMap </title>
    <link rel="icon" type="image/png" href="/images/New Logo.png">
    <link rel="stylesheet" href="/css/JobPosting.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Search and Action Buttons Styling */
        .search-action-container {
            margin: 40px auto;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .search-form {
            display: flex;
            gap: 10px;
            width: 100%;
            max-width: 600px;
            align-items: center;
        }

        .search-input {
            flex: 1;
            padding: 12px 20px;
            border-radius: 34px;
            border: 2px #d54e4e;
            background: rgba(246, 246, 246, 0.8);
            font-size: 16px;
            font-weight: 500;
            outline: none;
            transition: all 0.3s ease;
        }

        .search-input:focus {
            border-color: #ededed;
            background: #ededed;
        }

        .search-button {
            padding: 12px 30px;
            border-radius: 34px;
            border: none;
            background: #2391FF;
            color: #FFF;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .search-button:hover {
            background: #1c7ae6;
            transform: translateY(-2px);
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .action-btn {
            padding: 10px 25px;
            border-radius: 34px;
            border: 2px solid #2391FF;
            background: #2391FF;
            color: #FFF;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .action-btn:hover {
            background: #1c7ae6;
            border-color: #1c7ae6;
            transform: translateY(-2px);
        }

        .action-btn.secondary {
            background: transparent;
            color: #2391FF;
        }

        .action-btn.secondary:hover {
            background: rgba(35, 145, 255, 0.1);
        }

        @media (max-width: 768px) {
            .search-form {
                flex-direction: column;
                width: 100%;
            }

            .search-input {
                width: 100%;
            }

            .search-button {
                width: 100%;
            }

            .action-buttons {
                flex-direction: column;
                width: 100%;
            }

            .action-btn {
                width: 100%;
            }
        }
    </style>
</head>

<x-indexHeader>
    <x-indexFooter>
        <body>
            <div class="search-action-container">
                <div id="bb1" class="no-longer-a-box">
                    <div id="bh">
                        Explore Job Postings
                    </div>
                    <div id="bb2">
                        <button id="bu1" onclick="location.href = '/'">Roadmaps</button>
                        <button id="bu2"> Positions</button>
                    </div>
                </div>
                <form temp="@{/JobPostings/search(searchQuery=${searchQuery})}" method="post" class="search-form">
                    <input type="text" name="searchQuery" placeholder="Search by company name or job title" class="search-input"/>
                    <button type="submit" class="search-button"><img src="/images/magnifying_glass.png" alt="Magnifying glass" style="width: 22px; height: 22px"></button>
                </form>

                <div class="action-buttons">
                    <a href="/JobPostingForm" temp="${isRecruiter == true}">
                        <button class="action-btn">Add a job posting</button>
                    </a>
                    <a href="/recruiter/jobpostings" temp="${isRecruiter == true}">
                        <button class="action-btn">View Your job postings</button>
                    </a>
                </div>
                <div style="margin-top: 70px; margin-bottom: -90px;">
                    <a temp="${jobPostings.isEmpty()}"
                       style="text-decoration: none; font-size: 40px; font-weight: bold; color: #3e3e3e; display: flex; justify-content: center;">
                        No job postings to show.
                    </a>
                </div>
            </div>

            <div>
                <div class="grid" id="box">
                    <div class="box" temp="job : ${jobPostings}">
                        <div id="Title" temp="${job.jobName}">Title</div>
                        <div id="info" temp="${job.jobDescription}">
                            "Here's to the crazy ones, the misfits, the rebels, the troublemakers, the round pegs in the square holes... the ones who see things differently - they're not fond of rules... You can quote them, disagree with them, glorify or vilify them, but the only thing you can't do is ignore them because they change things... they push the human race forward, and while some may see them as the crazy ones, we see genius, because the ones who are crazy enough to think that they can change the world, are the ones who do."
                        </div>
                        <hr id="separator">
                        <div id="details" style="font-weight: bold; font-size: 20px;">Details</div>
                        <div class="unordered-list" id="details-specifics">
                            <ul>
                                <li>Email: <span temp="${job.recruiterEmail}">example@example.com</span></li>
                                <li>Company: <span temp="${job.companyName}">[COMPANY NAME]</span></li>
                                <li>Posting Type: <span temp="${job.jobPostingType}">Full Time</span></li>
                                <li>Date Posted: <span temp="${job.datePosted}">2024-01-01</span></li>
                                <li>Requirements: <span temp="${job.jobRequirements}">Requirements</span></li>
                                <li>Job ID: <span temp="${job.jobPostingUUID}">UUID</span></li>
                            </ul>
                            <div id="bottom" style="justify-items: right; display: flex; justify-content: flex-end">
                                <a temp="@{/applications/new(jobId=${job.jobPostingUUID})}" style="text-decoration: none" temp="${isRecruiter == false && isAdmin == false}">
                                    <button id="apply-button">Apply</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </x-indexFooter>
</x-indexHeader>
</html>
