(function () {
    var script = document.currentScript;
    var apiUrl = new URL("../../api/auth.php", script.src);
    var signInUrl = new URL("../../Profile/sign-in.html", script.src);
    var currentPath = window.location.pathname.toLowerCase();
    var isProductPage = currentPath.indexOf("/products/") !== -1;
    var authRequest;

    function checkAuthentication() {
        if (!authRequest) {
            authRequest = fetch(apiUrl, { cache: "no-store" })
                .then(function (response) {
                    if (!response.ok) throw new Error("Session check failed with status " + response.status);
                    return response.json();
                });
        }
        return authRequest;
    }

    function requireSignIn(returnTo) {
        signInUrl.searchParams.set("required", "1");
        signInUrl.searchParams.set("returnTo", returnTo);
        window.location.assign(signInUrl.href);
    }

    if (isProductPage) {
        checkAuthentication()
            .then(function (result) {
                if (!result.authenticated) {
                    requireSignIn(window.location.pathname + window.location.search + window.location.hash);
                    return;
                }
                document.body.classList.remove("product-access-pending");
            })
            .catch(function (error) {
                console.error("Could not verify product access:", error);
                window.alert("Could not verify your sign-in. Please try again.");
            });
    }

    document.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        var link = event.target.closest("a[href]");
        if (!link) return;

        var productUrl = new URL(link.href, window.location.href);
        if (productUrl.origin !== window.location.origin || productUrl.pathname.toLowerCase().indexOf("/products/") === -1) return;

        event.preventDefault();
        checkAuthentication()
            .then(function (result) {
                if (result.authenticated) {
                    window.location.assign(productUrl.href);
                    return;
                }
                requireSignIn(productUrl.pathname + productUrl.search + productUrl.hash);
            })
            .catch(function (error) {
                console.error("Could not verify product access:", error);
                window.alert("Could not verify your sign-in. Please try again.");
            });
    });
})();
