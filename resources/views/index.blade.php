<!Doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> InternMap </title>
    <link rel="icon" type="image/png" href="/Images/New Logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ url('/css/InternMapHomepage.css') }}">
    <meta name="viewport" content="width=device-width">
</head>

<x-indexHeader>
    <x-indexFooter>
        <body>
            <div id="bb1" class="box">
                <div id="bh">
                    Explore Roadmaps
                </div>
                <div id="bb2">
                    <button id="bu1">Roadmaps</button>
                    <button id="bu2" onclick="location.href = '/JobPostings'"> Positions</button>
                </div>
            </div>

            <div class="button-grid">
                <a temp="@{/roadmaps/new}"
                   class="grid-button" temp="${isAdmin == true}"><img src="/images/plus.png" alt="Create new Roadmap" width="46" height="46" id="grid-button-plus"></a>
                <a temp="{/roadmaps/{id}(id={$roadmap.roadmapID})}"
                   class="grid-button"
                   temp="roadmap : ${roadmaps}"
                   temp="${roadmap.name}"
                   style="text-decoration: none;">
                </a>

                @if ($roadmaps->isEmpty())
                <a style="text-decoration: none; font-size: 40px; font-weight: bold; color: #3e3e3e; display: flex; justify-content: center;">
                    No roadmaps to show.
                </a>
                @endif
            </div>
        </body>
    </x-indexFooter>
</x-indexHeader>

</html>
