<!Doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> InternMap </title>
    <link rel="icon" type="image/png" href="/Images/New Logo.png">
    <link rel="stylesheet" href="/static/InternMapHomepage.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="{{ url('/css/InternMapHomepage.css') }}'">
    <meta name="viewport" content="width=device-width">
</head>
<x>
<header>
    <div id="h1">
        <div id="T1" class="box" onclick="location.href = '/'" style="cursor: pointer">
            InternMap
        </div>
        <div id="s1" class="box-sign-buttons">
            <button id="hb1" onclick="location.href='/login'" temp="${isLoggedIn == false}">Sign in</button>
            <a temp="@{/signup-choice}" style="text-decoration: none;"></a>
            <button id="hb3" onclick="location.href='/signup-choice'" temp="${isLoggedIn == false}">Sign up</button>
            <form id="hb4" onclick="location.href='/logout';" temp="${isLoggedIn == true}">Log out</form>
            <button id="hb6" onclick="location.href='/profile'" temp="${isLoggedIn == true}">
                <img id="person-fill" src="/Images/person_fill.png" alt="Profile" style="width: 25px; height: 26px; margin-left: 10px;">
            </button>
        </div>
    </div>
    <div id="l1">
        <img id="logo" src="/Images/Navi/Navi Unique.png" alt="This didn't load successfully >:(" onclick="location.href = '/';" style="cursor: pointer">
        <span id="p1">InternMap</span>
        <span id="p2">Welcome to the platform that sets your future for you</span>
    </div>
</header>
{{$slot}}
