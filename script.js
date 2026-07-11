

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

    // ==========================================
    // Event Modal System
    // ==========================================
    const modalOverlay = document.getElementById('event-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const modalForm = document.getElementById('modal-form');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const headingsMap = {
        birthday: "YOUR DREAM BIRTHDAY CAKE STARTS HERE",
        catering: "Let's Feed Your Guests Right",
        snacks: "PACK YOUR PARTY WITH FLAVOR"
    };

    const buttonTextMap = {
        birthday: "Let's Talk Cake on WhatsApp",
        catering: "Let's Talk Catering on WhatsApp",
        snacks: "Let's Talk Snacks on WhatsApp"
    };

    const eventLabelMap = {
        birthday: "Birthday Cake",
        catering: "Event Catering",
        snacks: "Party Snack Packs"
    };

    let currentEventType = '';

    function openModal(eventType) {
        currentEventType = eventType;
        modalTitle.textContent = headingsMap[eventType] || "";
        modalSubmitBtn.textContent = buttonTextMap[eventType] || "Send Request on WhatsApp";

        // Reset form
        modalForm.reset();

        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventType = card.getAttribute('data-event-type');
            openModal(eventType);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const date = document.getElementById('form-date').value;
        const description = document.getElementById('form-desc').value.trim();

        const eventLabel = eventLabelMap[currentEventType] || currentEventType;

        // Construct the WhatsApp message body
        const message = `Hello Bliss Kitchen! 🍰

I would like to inquire about booking: *${eventLabel}*

*My Details:*
• Name: ${name}
• Phone: ${phone}
• Celebration Date: ${date}

*Imagination / Notes:*
${description}

Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+2348147847447?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        closeModal();
    });
});
