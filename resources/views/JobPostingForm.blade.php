<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Job Posting</title>
    <link rel="icon" type="image/png" href="{{ asset('images/New Logo.png') }}">
    <link rel="stylesheet" href="{{ asset('css/InternMapSignIn.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
<header>
    <div class="header-top">
        <nav class="header-nav">
            <a href="/login">
                <button class="btn-header primary">Sign In</button>
            </a>
        </nav>
    </div>
    <div class="header-hero">
        <img class="logo" src="{{ asset('Images/New Logo.png') }}" alt="InternMap Logo">
    </div>
</header>

<h2 class="form-title">Create a Job Posting</h2>
<div class="form-container">

    {{-- Success Message --}}
    @if(session('success'))
        <div style="color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; margin-bottom: 20px; border-radius: 8px;">
            <p style="margin: 0;">{{ session('success') }}</p>
        </div>
    @endif

    {{-- Error Message (General or Validation) --}}
    @if(session('errorMessage') || $errors->any())
        <div style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 12px; margin-bottom: 20px; border-radius: 8px;">
            <p style="margin: 0;">{{ session('errorMessage') ?? 'Please check the errors below.' }}</p>
            @if($errors->any())
                <ul style="margin-top: 10px;">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    @endif

    {{-- Use the named route job.store --}}
    <form action="{{ route('job.store') }}" method="POST">
        @csrf {{-- CRITICAL: Laravel requires this for POST requests --}}

        <input type="hidden" name="jobPostingType" id="jobPostingTypeHidden" value="">

        <div class="form-row">
            <div class="form-group">
                <label>
                    <select class="form-input" id="jobTypeSelect" required>
                        <option value="" disabled selected>Select Job Type</option>
                        <option value="Internship">Internship</option>
                        <option value="FullTime">Full Time</option>
                        <option value="FreeLanceProject">Freelance Project</option>
                    </select>
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="text" class="form-input" name="jobName" placeholder="Job Title" value="{{ old('jobName') }}" required />
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="text" class="form-input" name="companyName" placeholder="Company Name" value="{{ old('companyName') }}" required />
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="text" class="form-input" name="jobDescription" placeholder="Job Description" value="{{ old('jobDescription') }}" required />
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="text" class="form-input" name="jobRequirements" placeholder="Job Requirements" value="{{ old('jobRequirements') }}" required />
                </label>
            </div>

            <div id="fullTimeFields" style="display: none;">
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="benefits" placeholder="Benefits" id="fullTimeBenefits" />
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="location" placeholder="Location" id="fullTimeLocation" />
                    </label>
                </div>
            </div>

            <div id="internshipFields" style="display: none;">
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="duration" placeholder="Duration (e.g., 3 months)" id="internshipDuration" />
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="location" placeholder="Location" id="internshipLocation" />
                    </label>
                </div>
            </div>

            <div id="freeLanceProjectFields" style="display: none;">
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="duration" placeholder="Duration" id="freelanceDuration" />
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="payout" placeholder="Payout" id="freelancePayout" />
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="text" class="form-input" name="jobLocation" placeholder="Location" id="freelanceLocation" />
                    </label>
                </div>
            </div>
        </div>

        <button type="submit" class="form-submit">Add Job Posting</button>
    </form>
</div>

<x-footer></x-footer>

<script>
    function toggleJobSpecificFields() {
        let selectElement = document.getElementById("jobTypeSelect");
        let selectedValue = selectElement.value;

        document.getElementById("jobPostingTypeHidden").value = selectedValue;

        let fullTimeDiv = document.getElementById("fullTimeFields");
        let internshipDiv = document.getElementById("internshipFields");
        let freelanceDiv = document.getElementById("freeLanceProjectFields");

        fullTimeDiv.style.display = "none";
        internshipDiv.style.display = "none";
        freelanceDiv.style.display = "none";

        clearRequired("fullTimeBenefits");
        clearRequired("fullTimeLocation");
        clearRequired("internshipDuration");
        clearRequired("internshipLocation");
        clearRequired("freelanceDuration");
        clearRequired("freelancePayout");
        clearRequired("freelanceLocation");

        if (selectedValue === "FullTime") {
            fullTimeDiv.style.display = "block";
            setRequired("fullTimeBenefits");
            setRequired("fullTimeLocation");
        } else if (selectedValue === "Internship") {
            internshipDiv.style.display = "block";
            setRequired("internshipDuration");
            setRequired("internshipLocation");
        } else if (selectedValue === "FreeLanceProject") {
            freelanceDiv.style.display = "block";
            setRequired("freelanceDuration");
            setRequired("freelancePayout");
            setRequired("freelanceLocation");
        }
    }

    function setRequired(elementId) {
        let element = document.getElementById(elementId);
        if (element) { element.required = true; }
    }

    function clearRequired(elementId) {
        let element = document.getElementById(elementId);
        if (element) {
            element.required = false;
            // Only clear value if hidden, might want to keep if validation fails
            // element.value = "";
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        let selectElement = document.getElementById("jobTypeSelect");
        if (selectElement) {
            selectElement.addEventListener('change', toggleJobSpecificFields);
        }
        toggleJobSpecificFields();
    });
</script>
</body>
</html>
