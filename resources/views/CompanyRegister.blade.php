<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Register Company</title>
    <link rel="icon" type="image/png" href="/images/New Logo.png">
    <link rel="stylesheet" href="/css/InternMapSignIn.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<x-header />

<h2 class="form-title">Create a Company</h2>
<div class="form-container">

    @if (session('success'))
        <div style="color:#155724; background-color:#d4edda; border:1px solid #c3e6cb; padding:12px; margin-bottom:20px; border-radius:8px;">
            {{ session('success') }}
        </div>
    @endif

    @if ($errors->any())
        <div style="color:#721c24; background-color:#f8d7da; border:1px solid #f5c6cb; padding:12px; margin-bottom:20px; border-radius:8px;">
            <ul style="margin:0; padding-left:16px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('company.register.submit') }}">
        @csrf

        <div class="form-row">
            <div class="form-group">
                <input type="text"
                       name="name"
                       class="form-input"
                       value="{{ old('name') }}"
                       placeholder="Company Name"
                       required />
            </div>
            <div class="form-group">
                <input type="text"
                       name="industry"
                       class="form-input"
                       value="{{ old('industry') }}"
                       placeholder="Industry" />
            </div>
            <div class="form-group">
                <input type="url"
                       name="website_url"
                       class="form-input"
                       value="{{ old('website_url') }}"
                       placeholder="Company's website" />
            </div>
            <div class="form-group">
                <input type="text"
                       name="location_hq"
                       class="form-input"
                       value="{{ old('location_hq') }}"
                       placeholder="Office address" />
            </div>
        </div>

        <button type="submit" class="form-submit">Create Company</button>
    </form>

    <p class="form-link">
        Already registered your company?
        <a href="/recruiter/register">Back to recruiter registration</a>
    </p>

</div>

<x-footer />
</body>
</html>
