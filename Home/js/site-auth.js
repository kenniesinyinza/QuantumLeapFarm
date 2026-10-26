(function () {
    var script = document.currentScript;
    var apiUrl = new URL("../../api/auth.php", script.src);

    function profileLinks() {
        return Array.from(document.querySelectorAll('a[href]')).filter(function (link) {
            var path = new URL(link.href, window.location.href).pathname.toLowerCase();
            return path.endsWith("/profile/sign-in.html") || path.endsWith("/profile/sign-out.html");
        });
    }

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) throw new Error("Session check failed with status " + response.status);
            return response.json();
        })
        .then(function (result) {
            if (!result.authenticated) return;

            profileLinks().forEach(function (link) {
                var path = new URL(link.href, window.location.href).pathname.toLowerCase();
                if (path.endsWith("/profile/sign-out.html")) {
                    link.hidden = true;
                    return;
                }

                link.href = "#sign-out";
                link.textContent = "Sign Out";
                link.removeAttribute("data-i18n");
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "signout" })
                    })
                        .then(function (response) {
                            if (!response.ok) throw new Error("Sign out failed with status " + response.status);
                            window.location.reload();
                        })
                        .catch(function (error) {
                            console.error("Sign out request failed:", error);
                            window.alert("Could not sign out. Please try again.");
                        });
                });
            });
        })
        .catch(function (error) {
            console.error("Session check failed:", error);
        });
})();
