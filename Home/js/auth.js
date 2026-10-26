(function () {
    var form = document.querySelector("[data-auth-form]");
    if (!form) return;

    var status = document.querySelector("[data-auth-status]");
    var submitButton = form.querySelector('button[type="submit"]');
    var action = form.getAttribute("data-auth-form");
    var apiUrl = new URL("../api/auth.php", window.location.href);

    function showStatus(message, isError) {
        status.textContent = message;
        status.hidden = false;
        status.classList.toggle("is-error", Boolean(isError));
    }

    document.querySelectorAll("[data-password-toggle]").forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            var input = toggle.parentElement.querySelector("input");
            var visible = input.type === "password";
            input.type = visible ? "text" : "password";
            toggle.setAttribute("aria-label", visible ? "Hide password" : "Show password");
        });
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        var values = new FormData(form);
        var password = values.get("password");
        var payload = {
            action: action,
            email: values.get("email"),
            password: password
        };

        if (action === "signup") {
            payload.confirmPassword = values.get("confirmPassword");
            if (password !== payload.confirmPassword) {
                showStatus("Passwords do not match.", true);
                return;
            }
        }

        submitButton.disabled = true;
        showStatus("Please wait...", false);

        try {
            var response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            var result = await response.json();
            if (!response.ok) {
                showStatus(result.error || "The request could not be completed.", true);
                return;
            }
            window.location.href = "../Home/index.html";
        } catch (error) {
            console.error("Authentication request failed:", error);
            showStatus("The sign-in service is unavailable. Live Server cannot run PHP. Close Live Server, run start-local.bat, and open http://127.0.0.1:8000.", true);
        } finally {
            submitButton.disabled = false;
        }
    });
})();
