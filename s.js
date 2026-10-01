window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
});

window.addEventListener("load", () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");

    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }
});

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        const start = window.scrollY;
        const targetPosition =
            target.getBoundingClientRect().top + window.scrollY;

        const distance = targetPosition - start;
        const duration = 1200;

        let startTime = null;

        function animateScroll(currentTime) {

            if (!startTime) startTime = currentTime;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease In Out
            const ease =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(
                0,
                start + distance * ease
            );

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    });

});