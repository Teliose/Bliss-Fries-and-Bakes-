document.addEventListener("DOMContentLoaded", () => {
    const WHATSAPP_PHONE_NUMBER = "+2348147847447";

    // ==========================================
    // Hero Gallery Marquee Center Focus Observer
    // ==========================================
    const images = document.querySelectorAll(".hero-gallery__item");

    if (images.length > 0) {
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

        function loop() {
            updateCenterFocus();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    // ==========================================
    // Event Modal System (Guarded for pages without modal)
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
        if (!modalOverlay || !modalTitle || !modalSubmitBtn || !modalForm) return;
        currentEventType = eventType;
        modalTitle.textContent = headingsMap[eventType] || "";
        modalSubmitBtn.textContent = buttonTextMap[eventType] || "Send Request on WhatsApp";

        modalForm.reset();
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventType = card.getAttribute('data-event-type');
            openModal(eventType);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
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
    }

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const date = document.getElementById('form-date').value;
            const description = document.getElementById('form-desc').value.trim();

            const eventLabel = eventLabelMap[currentEventType] || currentEventType;

            const message = `Hello Bliss Kitchen! 🍰\n\nI would like to inquire about booking: *${eventLabel}*\n\n*My Details:*\n• Name: ${name}\n• Phone: ${phone}\n• Celebration Date: ${date}\n\n*Imagination / Notes:*\n${description}\n\nThank you!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            closeModal();
        });
    }

    // ==========================================
    // Mobile Navigation Hamburger System
    // ==========================================
    const hamburgerBtn = document.getElementById('mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');

    if (hamburgerBtn && navLinks && navBackdrop) {
        function toggleMenu() {
            const isOpen = navLinks.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            hamburgerBtn.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            navLinks.classList.add('active');
            navBackdrop.classList.add('active');
            document.body.classList.add('nav-open');
        }

        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.classList.remove('nav-open');
        }

        hamburgerBtn.addEventListener('click', toggleMenu);
        navBackdrop.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ==========================================
    // Persistent LocalStorage Cart Module & Live Floating Bar
    // ==========================================
    let cart = {};
    try {
        const savedCart = localStorage.getItem("blissKitchenCart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.error("Failed to load cart from localStorage", e);
    }

    const badge = document.querySelector(".cart-badge");
    const floatingCartBar = document.getElementById("floating-cart-bar");
    const floatingCartInfo = document.getElementById("floating-cart-info");

    function updateCartBadge() {
        if (!badge) return;
        const totalQty = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        badge.textContent = totalQty;
    }

    /**
     * Calculates live total price by matching cart IDs against products.js dataset
     * (or DOM data-price fallback) and updates floating cart summary bar.
     */
    function updateFloatingCartBar() {
        if (!floatingCartBar || !floatingCartInfo) return;

        const cartKeys = Object.keys(cart);
        let totalQty = 0;
        let totalPrice = 0;

        cartKeys.forEach(id => {
            const qty = cart[id];
            if (qty > 0) {
                totalQty += qty;
                let unitPrice = 0;

                // Priority lookup against products dataset
                if (typeof products !== "undefined" && Array.isArray(products)) {
                    const item = products.find(p => p.id === id);
                    if (item) unitPrice = item.price;
                }

                // Fallback: DOM lookup if data-price attribute exists
                if (!unitPrice) {
                    const domCard = document.querySelector(`.product-card[data-product-id="${id}"]`);
                    if (domCard && domCard.getAttribute("data-price")) {
                        unitPrice = parseFloat(domCard.getAttribute("data-price")) || 0;
                    }
                }

                totalPrice += qty * unitPrice;
            }
        });

        if (totalQty > 0) {
            floatingCartBar.style.display = "flex";
            const itemLabel = totalQty === 1 ? "item" : "items";
            const formattedPrice = totalPrice.toLocaleString();
            floatingCartInfo.textContent = `${totalQty} ${itemLabel} - ₦${formattedPrice}`;
        } else {
            floatingCartBar.style.display = "none";
        }
    }

    function updateCardUI(card) {
        const productId = card.getAttribute("data-product-id");
        if (!productId) return;

        const qty = cart[productId] || 0;
        const addBtn = card.querySelector(".add-to-order-btn");
        const stepper = card.querySelector(".qty-stepper");
        const countDisplay = card.querySelector(".qty-count");

        if (qty > 0) {
            if (addBtn) addBtn.style.display = "none";
            if (stepper) stepper.style.display = "flex";
            if (countDisplay) countDisplay.textContent = qty;
        } else {
            if (addBtn) addBtn.style.display = "block";
            if (stepper) stepper.style.display = "none";
        }
    }

    function updateAllCardsUI() {
        document.querySelectorAll(".product-card").forEach(updateCardUI);
    }

    function saveCart() {
        try {
            localStorage.setItem("blissKitchenCart", JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
        updateCartBadge();
        updateFloatingCartBar();
        if (typeof renderCartDrawer === "function" && cartDrawer && cartDrawer.classList.contains("active")) {
            renderCartDrawer();
        }
    }

    // ==========================================
    // PART 5 — Event Delegation for Cart Controls
    // Enables cart interaction on static AND dynamically loaded cards (Load More)
    // ==========================================
    document.addEventListener("click", (e) => {
        const addBtn = e.target.closest(".add-to-order-btn");
        const decBtn = e.target.closest(".qty-decrease");
        const incBtn = e.target.closest(".qty-increase");

        if (addBtn) {
            const card = addBtn.closest(".product-card");
            if (!card) return;
            const productId = card.getAttribute("data-product-id");
            if (!productId) return;

            cart[productId] = 1;
            saveCart();
            updateAllCardsUI();
        } else if (decBtn) {
            const card = decBtn.closest(".product-card");
            if (!card) return;
            const productId = card.getAttribute("data-product-id");
            if (!productId) return;

            const currentQty = cart[productId] || 0;
            if (currentQty > 1) {
                cart[productId] = currentQty - 1;
            } else {
                delete cart[productId];
            }
            saveCart();
            updateAllCardsUI();
        } else if (incBtn) {
            const card = incBtn.closest(".product-card");
            if (!card) return;
            const productId = card.getAttribute("data-product-id");
            if (!productId) return;

            const currentQty = cart[productId] || 0;
            cart[productId] = currentQty + 1;
            saveCart();
            updateAllCardsUI();
        }
    });

    // Initial Cart & Floating Bar UI Sync
    updateCartBadge();
    updateAllCardsUI();
    updateFloatingCartBar();

    // ==========================================
    // Store Page Grid Rendering & "Load More" Pagination
    // ==========================================
    const storeGrid = document.getElementById("store-grid");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const resultsCountText = document.getElementById("results-count");

    let displayedProductCount = 0;
    const BATCH_SIZE = 12;

    function createProductCardHTML(product) {
        return `
            <div class="product-card" data-product-id="${product.id}" data-price="${product.price}">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                </div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description || ""}</p>
                <span class="product-price">₦${product.price.toLocaleString()}</span>
                <div class="cart-action-row">
                    <button class="add-to-order-btn">Add to order</button>
                    <div class="qty-stepper" style="display: none;">
                        <button class="qty-decrease">−</button>
                        <span class="qty-count">0</span>
                        <button class="qty-increase">+</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderNextBatch() {
        if (!storeGrid || typeof products === "undefined" || !Array.isArray(products)) return;

        const nextBatch = products.slice(displayedProductCount, displayedProductCount + BATCH_SIZE);
        if (nextBatch.length === 0) return;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = nextBatch.map(createProductCardHTML).join("");

        while (tempDiv.firstChild) {
            storeGrid.appendChild(tempDiv.firstChild);
        }

        displayedProductCount += nextBatch.length;

        if (resultsCountText) {
            resultsCountText.textContent = `Showing 1-${displayedProductCount} of ${products.length} results`;
        }

        if (displayedProductCount >= products.length && loadMoreBtn) {
            loadMoreBtn.style.display = "none";
        }

        updateAllCardsUI();
    }

    if (storeGrid) {
        renderNextBatch(); // Load initial batch of 12
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            renderNextBatch();
        });
    }

    // ==========================================
    // Category Dropdown Toggle & Selection (Visual Only for this pass)
    // ==========================================
    const categoryDropdown = document.getElementById("category-dropdown");
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownSelectedText = document.getElementById("dropdown-selected-text");
    const dropdownOptions = document.querySelectorAll(".dropdown-option");

    if (dropdownToggle && categoryDropdown) {
        dropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = categoryDropdown.classList.contains("active");
            if (isOpen) {
                categoryDropdown.classList.remove("active");
                dropdownToggle.setAttribute("aria-expanded", "false");
            } else {
                categoryDropdown.classList.add("active");
                dropdownToggle.setAttribute("aria-expanded", "true");
            }
        });

        document.addEventListener("click", (e) => {
            if (!categoryDropdown.contains(e.target)) {
                categoryDropdown.classList.remove("active");
                dropdownToggle.setAttribute("aria-expanded", "false");
            }
        });

        dropdownOptions.forEach(option => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdownOptions.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");

                if (dropdownSelectedText) {
                    dropdownSelectedText.textContent = option.textContent.trim();
                }

                categoryDropdown.classList.remove("active");
                dropdownToggle.setAttribute("aria-expanded", "false");
                // Code note: Category filter logic is ready to be connected here in a future pass
            });
        });
    }

    // ==========================================
    // Cart Review Drawer Module
    // ==========================================
    const cartDrawer = document.getElementById("cart-drawer");
    const cartDrawerCloseBtn = document.getElementById("cart-drawer-close");
    const cartDrawerItemsContainer = document.getElementById("cart-drawer-items");
    const cartDrawerSubtotalRow = document.getElementById("cart-drawer-subtotal-row");
    const cartDrawerSubtotalVal = document.getElementById("cart-drawer-subtotal-val");
    const cartDrawerPreviewText = document.getElementById("cart-drawer-preview-text");
    const cartDrawerSendBtn = document.getElementById("cart-drawer-send-btn");

    const drawerNameInput = document.getElementById("cart-drawer-name");
    const drawerPhoneInput = document.getElementById("cart-drawer-phone");
    const drawerDeliveryInput = document.getElementById("cart-drawer-delivery");
    const drawerTimeInput = document.getElementById("cart-drawer-time");

    /**
     * Builds exact WhatsApp order message string using live cart data and 4 customer detail inputs.
     * Shared by both live preview display and WhatsApp send action.
     */
    function buildWhatsAppMessage() {
        const nameVal = drawerNameInput ? drawerNameInput.value.trim() : "";
        const phoneVal = drawerPhoneInput ? drawerPhoneInput.value.trim() : "";
        const deliveryVal = drawerDeliveryInput ? drawerDeliveryInput.value.trim() : "";
        const timeVal = drawerTimeInput ? drawerTimeInput.value.trim() : "";

        const itemLines = [];
        let subtotal = 0;

        Object.keys(cart).forEach(id => {
            const qty = cart[id];
            if (qty > 0) {
                let title = id;
                let price = 0;

                if (typeof products !== "undefined" && Array.isArray(products)) {
                    const item = products.find(p => p.id === id);
                    if (item) {
                        title = item.title;
                        price = item.price;
                    }
                }

                if (!price) {
                    const domCard = document.querySelector(`.product-card[data-product-id="${id}"]`);
                    if (domCard) {
                        const domTitle = domCard.querySelector(".product-title");
                        if (domTitle) title = domTitle.textContent.trim();
                        price = parseFloat(domCard.getAttribute("data-price")) || 0;
                    }
                }

                const lineTotal = qty * price;
                subtotal += lineTotal;
                itemLines.push(`${qty}× ${title} — NGN ${lineTotal.toLocaleString()}`);
            }
        });

        const itemsBlock = itemLines.length > 0 ? itemLines.join("\n") : "[No items in cart]";

        const formattedMessage = `Hi Bliss Kitchen 👋 I'd like to place an order:

${itemsBlock}

Subtotal: NGN ${subtotal.toLocaleString()}
Delivery area: ${deliveryVal || "[not provided yet]"}
Preferred time: ${timeVal || "[not provided yet]"}
Name: ${nameVal || "[not provided yet]"}
Phone: ${phoneVal || "[not provided yet]"}

Please confirm total & delivery fee. Thank you!`;

        return formattedMessage;
    }

    /**
     * Renders cart items list, subtotal, and updates live preview in the drawer.
     */
    function renderCartDrawer() {
        if (!cartDrawerItemsContainer || !cartDrawerSubtotalVal) return;

        const cartKeys = Object.keys(cart).filter(id => cart[id] > 0);
        let subtotal = 0;

        if (cartKeys.length === 0) {
            cartDrawerItemsContainer.innerHTML = '<p class="cart-drawer__empty">Your cart is empty</p>';
            cartDrawerSubtotalVal.textContent = "NGN 0";
            if (cartDrawerSubtotalRow) cartDrawerSubtotalRow.style.display = "none";
            if (cartDrawerSendBtn) cartDrawerSendBtn.disabled = true;
        } else {
            let html = "";

            cartKeys.forEach(id => {
                const qty = cart[id];
                let title = id;
                let price = 0;

                if (typeof products !== "undefined" && Array.isArray(products)) {
                    const item = products.find(p => p.id === id);
                    if (item) {
                        title = item.title;
                        price = item.price;
                    }
                }

                if (!price) {
                    const domCard = document.querySelector(`.product-card[data-product-id="${id}"]`);
                    if (domCard) {
                        const domTitle = domCard.querySelector(".product-title");
                        if (domTitle) title = domTitle.textContent.trim();
                        price = parseFloat(domCard.getAttribute("data-price")) || 0;
                    }
                }

                const lineTotal = qty * price;
                subtotal += lineTotal;

                html += `
                    <div class="cart-drawer__item">
                        <div class="cart-drawer__item-info">
                            <span class="cart-drawer__item-title">${title}</span>
                            <span class="cart-drawer__item-subtitle">${qty} × NGN ${price.toLocaleString()}</span>
                        </div>
                        <span class="cart-drawer__item-price">NGN ${lineTotal.toLocaleString()}</span>
                    </div>
                `;
            });

            cartDrawerItemsContainer.innerHTML = html;
            cartDrawerSubtotalVal.textContent = `NGN ${subtotal.toLocaleString()}`;
            if (cartDrawerSubtotalRow) cartDrawerSubtotalRow.style.display = "flex";
            if (cartDrawerSendBtn) cartDrawerSendBtn.disabled = false;
        }

        updateLivePreview();
    }

    /**
     * Updates live preview text box with current message content
     */
    function updateLivePreview() {
        if (cartDrawerPreviewText) {
            cartDrawerPreviewText.textContent = buildWhatsAppMessage();
        }
    }

    function openCartDrawer() {
        if (!cartDrawer) return;
        renderCartDrawer();
        cartDrawer.classList.add("active");
        document.body.classList.add("cart-drawer-open");
    }

    function closeCartDrawer() {
        if (!cartDrawer) return;
        cartDrawer.classList.remove("active");
        document.body.classList.remove("cart-drawer-open");
    }

    // Attach click triggers to header cart icon and floating bar review order link
    document.querySelectorAll(".cart-button, .floating-cart-link").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    });

    // Close button trigger
    if (cartDrawerCloseBtn) {
        cartDrawerCloseBtn.addEventListener("click", closeCartDrawer);
    }

    // Outside click trigger (close drawer when clicking on page outside drawer)
    document.addEventListener("click", (e) => {
        if (cartDrawer && cartDrawer.classList.contains("active")) {
            const isClickInside = cartDrawer.contains(e.target);
            const isTrigger = e.target.closest(".cart-button") || e.target.closest(".floating-cart-link");
            if (!isClickInside && !isTrigger) {
                closeCartDrawer();
            }
        }
    });

    // Escape key trigger
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartDrawer && cartDrawer.classList.contains("active")) {
            closeCartDrawer();
        }
    });

    // Live update preview on form input keystrokes
    [drawerNameInput, drawerPhoneInput, drawerDeliveryInput, drawerTimeInput].forEach(input => {
        if (input) {
            input.addEventListener("input", updateLivePreview);
        }
    });

    // Send order on WhatsApp button click handler
    if (cartDrawerSendBtn) {
        cartDrawerSendBtn.addEventListener("click", () => {
            const totalQty = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
            if (totalQty === 0) return;

            const message = buildWhatsAppMessage();
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        });
    }
});
