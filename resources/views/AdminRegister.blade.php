<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>InternMap - Admin Sign Up</title>
    <link rel="icon" type="image/png" th:href="@{/images/Logo Glass.png}">
    <link rel="stylesheet" th:href="@{/InternMapSignIn.css}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<x-header>
    <x-footer>
        <body>

        <h2 class="form-title">Admin Sign Up</h2>

            <div class="form-container">
                <div temp="${errorMessage}"
                     style="color:red;border: 0 solid red;padding:2px;margin-bottom:15px; font-weight: 550;">
                    <p temp="${errorMessage}"></p>
                </div>
                <form action="@{/admin/register}"
                      object="${user}"
                      method="post">
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
                    </div>
                    <button type="submit" class="form-submit">Create Account</button>
                </form>

                <p class="form-link">
                    Already have an account?
                    <a href="/login">Sign In</a>
                </p>
            </div>
        </body>
    </x-footer>
</x-header>
</html>
