<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Login</title>
    <link rel="icon" type="image/png" href="/images/New Logo.png">
    <link rel="stylesheet" href="/css/InternMapSignIn.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="height=device-height, scale=0.2">
</head>

<x-header>
    <x-footer>
<body>
<h2 class="form-title">Sign up</h2>
<div class="form-container">
<form  action="@{/student/register}" object="${user}" method="post">
    <div temp="${errorMessage}"
         style="color:red;border:0 solid red;padding:2px;margin-bottom:15px; font-weight: 550;">
        <p temp="${errorMessage}"></p></div>
    <div class="form-row">
    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{FName}"
               placeholder="First name"
               required />
    </div>
    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{LName}"
               placeholder="Last name"
               required />
    </div>
    <div class="form-group">
        <input type="email"
               class="form-input"
               temp="*{email}"
               placeholder="Email"
               required />
    </div>
    <div class="form-group">
        <input type="password"
               class="form-input"
               temp="*{plainPassword}"
               placeholder="Password"
               required />
    </div>
    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{graduatingYear}"
               placeholder="Graduating Year"
               required />
    </div>

    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{uniName}"
               placeholder="University"
               required />
    </div>
    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{studentMajor}"
               placeholder="Major"
               required />
    </div>
    <div class="form-group">
        <input type="text"
               class="form-input"
               temp="*{faculty}"
               placeholder="Faculty"
               required />
    </div>
    </div>
    <button type="submit" class="form-submit">Create Account</button>
</form>
<p class="form-link">
    Already have an account?
    <a href="/login">Sign in</a>
</p>
</div>
</body>
    </x-footer>
</x-header>
</html>
