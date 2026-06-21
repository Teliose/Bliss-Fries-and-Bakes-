

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".hero-gallery__item");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    };

    const observer = new IntersectionObserver((entries) => {
        updateCenterFocus();
    }, observerOptions);

    images.forEach((img) => {
        observer.observe(img);
    });

    function updateCenterFocus() {
        let closestImg = null;
        let minDistance = Infinity;
        const centerOfViewport = window.innerWidth / 2;

        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.left + rect.width / 2;
            const distance = Math.abs(imgCenter - centerOfViewport);

            if (distance < minDistance) {
                minDistance = distance;
                closestImg = img;
            }
        });

        images.forEach((img) => {
            if (img === closestImg) {
                img.classList.add("center-focus");
            } else {
                img.classList.remove("center-focus");
            }
        });
    }

    // Sync update with animation frames for pixel-perfect smooth transition
    function loop() {
        updateCenterFocus();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});
