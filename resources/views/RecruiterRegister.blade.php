<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Register</title>
    <link rel="icon" type="image/png" href="/images/Logo Glass Large.png">
    <link rel="stylesheet" href="/css/InternMapSignIn.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<x-header />

<h2 class="form-title">Sign up</h2>
<div class="form-container">

    @if ($errors->any())
        <div style="color:red; margin-bottom:15px; font-weight:550;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('recruiter.register.submit') }}">
        @csrf

        <div class="form-row">
            <div class="form-group">
                <input type="text"
                       name="f_name"
                       class="form-input"
                       value="{{ old('f_name') }}"
                       placeholder="First name"
                       required />
            </div>
            <div class="form-group">
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
