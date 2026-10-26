(function () {
    var form = document.querySelector("[data-auth-form]");
    if (!form) return;

    var status = document.querySelector("[data-auth-status]");
    var submitButton = form.querySelector('button[type="submit"]');
    var action = form.getAttribute("data-auth-form");
    var apiUrl = new URL("../api/auth.php", window.location.href);
    var query = new URLSearchParams(window.location.search);
    var returnTo = query.get("returnTo");
    var requiredMessage = document.querySelector("[data-auth-required]");

    function safeProductReturnUrl(value) {
        if (!value) return null;
        var destination = new URL(value, window.location.href);
        if (destination.origin !== window.location.origin || destination.pathname.toLowerCase().indexOf("/products/") === -1) return null;
        return destination.href;
    }

    if (requiredMessage && query.get("required") === "1") {
        requiredMessage.hidden = false;
    }

    document.querySelectorAll("[data-auth-switch]").forEach(function (link) {
        if (query.get("required") !== "1") return;
        var destination = new URL(link.href, window.location.href);
        destination.search = window.location.search;
        link.href = destination.href;
    });

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
            window.location.href = safeProductReturnUrl(returnTo) || "../Home/index.html";
        } catch (error) {
            console.error("Authentication request failed:", error);
            showStatus("Could not connect to the server. Start the local PHP server and try again.", true);
        } finally {
            submitButton.disabled = false;
        }
    });
})();
