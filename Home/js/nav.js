
document.addEventListener('DOMContentLoaded', function () {
            const navItems = document.querySelectorAll('nav > ul > li');

            navItems.forEach(function (item) {
                const dropdown = item.querySelector('ul.dropdown');
                if (!dropdown) return;

                const trigger = item.querySelector('a, button');
                if (!trigger) return;

                trigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    const isOpen = item.classList.contains('open');

                    navItems.forEach(function (otherItem) {
                        otherItem.classList.remove('open');
                        const otherButton = otherItem.querySelector('button');
                        if (otherButton) {
                            otherButton.setAttribute('aria-expanded', 'false');
                        }
                    });

                    if (!isOpen) {
                        item.classList.add('open');
                        if (trigger.tagName === 'BUTTON') {
                            trigger.setAttribute('aria-expanded', 'true');
                        }
                    }
                });
            });

            document.addEventListener('click', function (event) {
                const clickedInside = event.target.closest('nav > ul > li');
                if (!clickedInside) {
                    navItems.forEach(function (item) {
                        item.classList.remove('open');
                        const button = item.querySelector('button');
                        if (button) button.setAttribute('aria-expanded', 'false');
                    });
                }
            });
        });