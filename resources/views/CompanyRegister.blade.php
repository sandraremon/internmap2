<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Register Company</title>
    <link rel="icon" type="image/png" href="/images/New Logo.png">
    <link rel="stylesheet" href="/css/InternMapSignIn.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<header>
    <div class="header-top">
        <nav class="header-nav">
            <a href="/login">
                <button class="btn-header primary">Sign In</button>
            </a>
        </nav>
    </div>
    <div class="header-hero">
        <img class="logo" src="/images/New Logo.png" alt="InternMap Logo">
    </div>
</header>

<x-footer>
<body>
<h2 class="form-title">Create a Company</h2>
<div class="form-container">

    <!-- Success Message -->
    <div temp="${success}"
         style="color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; margin-bottom: 20px; border-radius: 8px;">
        <p temp="${success}" style="margin: 0;"></p>
    </div>

    <!-- Error Message -->
    <div temp="${errorMessage}"
         style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 12px; margin-bottom: 20px; border-radius: 8px;">
        <p temp="${errorMessage}" style="margin: 0;"></p>
    </div>

    <form action="@{/company/register}" object="${company}" method="post">

        <div class="form-row">
            <div class="form-group">
                <label>
                    <input type="text"
                           class="form-input"
                           temp="*{name}"
                           placeholder="Company Name"
                           required />
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="text"
                           class="form-input"
                           temp="*{industry}"
                           placeholder="Industry" />
                </label>
            </div>

            <div class="form-group">
                <label>
                    <input type="url"
                           class="form-input"
                           temp="*{websiteURL}"
                           placeholder="Company's website" />
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="text"
                           class="form-input"
                           temp="*{locationOfHQ}"
                           placeholder="Office address" />
                </label>
            </div>
        </div>

        <button type="submit" class="form-submit">Create Company</button>
    </form>

    <p class="form-link">
        Already registered your company?
        <a href="/recruiter/register">Back to recruiter registration</a>
    </p>
</div>
</body>
</x-footer>
</html>
