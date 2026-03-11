<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Login</title>
    <link rel="icon" type="image/png" href="/images/Logo Glass Large.png">
    <link rel="stylesheet" href="/css/InternMapSignIn.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<x-header>
<x-footer>
<body>
<h2 class="form-title">Sign up</h2>
<div class="form-container">
    <div temp="${errorMessage}"
         style="color:red;border: 0 solid red;padding:2px;margin-bottom:15px; font-weight: 550;">
        <p temp="${errorMessage}"></p></div>
<form action="@{/recruiter/register}"
      object="${form}"
      method="post">
    <div class="form-row">
        <div class="form-group">
            <input type="text"
                   class="form-input"
                   temp="*{user.FName}"
                   placeholder="First name"
                   required />
        </div>
        <div class="form-group">
            <input type="text"
                   class="form-input"
                   temp="*{user.LName}"
                   placeholder="Last name"
                   required />
        </div>
        <div class="form-group">
            <input type="email"
                   class="form-input"
                   temp="*{user.email}"
                   placeholder="Email"
                   required />
        </div>
        <div class="form-group">
            <input type="password"
                   class="form-input"
                   temp="*{user.plainPassword}"
                   placeholder="Password"
                   required />
        </div>

        <div class="form-group">
            <label>
                <input type="text"
                       class="form-input"
                       temp="*{user.title}"
                       placeholder="Title"
                       required />
            </label>
        </div>
        <div class="form-group">
            <label>
                <input type="text"
                       class="form-input"
                       temp="*{company.name}"
                       placeholder="Company's name">
            </label>
        </div>
    </div>
    <button type="submit" class="form-submit">Create Account</button>
</form>

    <p class="form-link">
        If your company doesn't exist, you can
        <a href="/company/register">create a company</a>
    </p>
    <p class="form-link">
        Already have an account?
        <a href="/login">Sign in</a>
    </p>

</div>
</body>
</x-footer>
</x-header>
</html>
