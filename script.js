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

            const message = `Hello Bliss Fries and Bakes! 🍰\n\nI would like to inquire about booking: *${eventLabel}*\n\n*My Details:*\n• Name: ${name}\n• Phone: ${phone}\n• Celebration Date: ${date}\n\n*Imagination / Notes:*\n${description}\n\nThank you!`;

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
    // (Data shape: { lastUpdated: timestamp, items: { [productId]: qty } })
    // ==========================================
    const CART_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    let cart = {};

    function clearCartStorage() {
        cart = {};
        try {
            localStorage.removeItem("blissFriesAndBakesCart");
        } catch (e) {
            console.error("Failed to clear cart from localStorage", e);
        }
    }

    /**
     * Reads cart from localStorage and enforces 24-hour expiration window.
     * Also provides backward compatibility by invalidating legacy un-wrapped cart objects.
     */
    function loadCartFromStorage() {
        try {
            const savedRaw = localStorage.getItem("blissFriesAndBakesCart");
            if (savedRaw) {
                const parsed = JSON.parse(savedRaw);
                if (
                    parsed &&
                    typeof parsed === "object" &&
                    typeof parsed.lastUpdated === "number" &&
                    parsed.items &&
                    typeof parsed.items === "object"
                ) {
                    const age = Date.now() - parsed.lastUpdated;
                    if (age > CART_EXPIRY_MS) {
                        clearCartStorage();
                    } else {
                        cart = parsed.items;
                    }
                } else {
                    // Legacy flat object or invalid shape -> treat as expired & clear
                    clearCartStorage();
                }
            } else {
                cart = {};
            }
        } catch (e) {
            console.error("Failed to load cart from localStorage", e);
            cart = {};
        }
    }

    // Initial cart load with timestamp/expiry check
    loadCartFromStorage();

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
                const productsData = window.products || (typeof products !== "undefined" && Array.isArray(products) ? products : []);
                if (Array.isArray(productsData)) {
                    const item = productsData.find(p => p.id === id);
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

    /**
     * Saves cart to localStorage under timestamped wrapper { lastUpdated, items }
     * and refreshes active UI components.
     */
    function saveCart() {
        const cartData = {
            lastUpdated: Date.now(),
            items: cart
        };
        try {
            localStorage.setItem("blissFriesAndBakesCart", JSON.stringify(cartData));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
        updateCartBadge();
        updateFloatingCartBar();
        if (typeof renderCartDrawer === "function" && cartDrawer && cartDrawer.classList.contains("active")) {
            renderCartDrawer();
        }
    }

    /**
     * Resets cart to empty state across UI and localStorage after WhatsApp order handoff.
     */
    function resetCartAfterOrder() {
        clearCartStorage();
        updateCartBadge();
        updateAllCardsUI();
        updateFloatingCartBar();
        if (typeof renderCartDrawer === "function") {
            renderCartDrawer();
        }
        closeCartDrawer();
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
    // Store Page & Homepage Featured Grid Rendering, Pagination & Filtering
    // ==========================================
    const storeGrid = document.getElementById("store-grid");
    const picksGrid = document.getElementById("order");
    const paginationContainer = document.getElementById("pagination-container");
    const resultsCountText = document.getElementById("results-count");

    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let currentCategory = "All";
    let currentSearchQuery = "";
    let currentFilteredProducts = [];

    const FEATURED_PRODUCT_IDS = [
        "jollof-rice",
        "the-ultimate-grill-small-chops-box",
        "meat-pie",
        "nkwobi",
        "blizo-premium-blend",
        "chips-wih-grilled-chicken",
        "blizo-fruit-punch",
        "peppered-fish-yam-fries"
    ];

    function getProductsDataset() {
        if (window.products && Array.isArray(window.products)) {
            return window.products;
        }
        if (typeof products !== "undefined" && Array.isArray(products)) {
            return products;
        }
        return [];
    }

    function renderHomepageFeaturedCards(productsData) {
        if (!picksGrid || !Array.isArray(productsData) || productsData.length === 0) return;

        const featuredProducts = FEATURED_PRODUCT_IDS
            .map(id => productsData.find(p => p.id === id))
            .filter(Boolean);

        if (featuredProducts.length > 0) {
            picksGrid.innerHTML = featuredProducts.map(createProductCardHTML).join("");
        }
    }

    /**
     * Filters products based on combined active category and search query (AND logic).
     * @param {string} [category] - Optional category filter value
     * @param {string} [searchQuery] - Optional search query string
     */
    function filterProducts(category, searchQuery) {
        if (category !== undefined) {
            currentCategory = category || "All";
        }
        if (searchQuery !== undefined) {
            currentSearchQuery = searchQuery !== null ? searchQuery : "";
        }

        const productsData = getProductsDataset();
        const trimmedQuery = currentSearchQuery.trim().toLowerCase();
        const isCategoryFiltered = currentCategory && currentCategory !== "All" && currentCategory !== "All Categories";

        if (Array.isArray(productsData) && productsData.length > 0) {
            currentFilteredProducts = productsData.filter(product => {
                // 1. Category match
                const matchesCategory = !isCategoryFiltered || product.category === currentCategory;

                // 2. Search query match against title OR description (case-insensitive)
                let matchesSearch = true;
                if (trimmedQuery.length > 0) {
                    const titleMatch = (product.title || "").toLowerCase().includes(trimmedQuery);
                    const descMatch = (product.description || "").toLowerCase().includes(trimmedQuery);
                    matchesSearch = titleMatch || descMatch;
                }

                return matchesCategory && matchesSearch;
            });
        } else {
            currentFilteredProducts = [];
        }

        renderPage(1, false);
    }

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

    function scrollToGridTop() {
        if (!storeGrid) return;
        const headerOffset = 120;
        const elementPosition = storeGrid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth"
        });
    }

    function renderPage(page, shouldScroll = false) {
        if (!storeGrid) return;

        const totalProducts = currentFilteredProducts.length;
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

        if (totalProducts === 0) {
            currentPage = 1;

            const isCategoryActive = currentCategory && currentCategory !== "All" && currentCategory !== "All Categories";
            const cleanSearchQuery = currentSearchQuery.trim();
            const isSearchActive = cleanSearchQuery.length > 0;

            let messageText = "No products found";
            if (isCategoryActive && isSearchActive) {
                messageText = `No products found for "${cleanSearchQuery}" in ${currentCategory}`;
            } else if (isCategoryActive) {
                messageText = `No products found in ${currentCategory}`;
            } else if (isSearchActive) {
                messageText = `No products found for "${cleanSearchQuery}"`;
            }

            storeGrid.innerHTML = `
                <div class="no-products-message">
                    <p>${messageText}</p>
                </div>
            `;
            if (resultsCountText) {
                resultsCountText.textContent = "Showing 0-0 of 0 results";
            }
            if (paginationContainer) {
                paginationContainer.innerHTML = "";
            }
            return;
        }

        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        currentPage = page;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalProducts);
        const currentProducts = currentFilteredProducts.slice(startIndex, endIndex);

        storeGrid.innerHTML = currentProducts.map(createProductCardHTML).join("");

        if (resultsCountText) {
            resultsCountText.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalProducts} results`;
        }

        updateAllCardsUI();
        renderPaginationControls(totalPages);

        if (shouldScroll) {
            scrollToGridTop();
        }
    }

    function renderPaginationControls(totalPages) {
        if (!paginationContainer) return;

        if (totalPages <= 0) {
            paginationContainer.innerHTML = "";
            return;
        }

        let html = "";

        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage;
            html += `<button type="button" class="pagination-btn ${isActive ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${isActive ? 'aria-current="page"' : ''}>${i}</button>`;
        }

        if (totalPages > 1) {
            const isLastPage = currentPage === totalPages;
            html += `<button type="button" class="pagination-btn pagination-next ${isLastPage ? 'disabled' : ''}" data-page="next" aria-label="Next page" ${isLastPage ? 'disabled' : ''}>»</button>`;
        }

        paginationContainer.innerHTML = html;
    }

    if (paginationContainer) {
        paginationContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".pagination-btn");
            if (!btn || btn.disabled || btn.classList.contains("disabled")) return;

            const pageAttr = btn.getAttribute("data-page");
            let targetPage = currentPage;

            if (pageAttr === "next") {
                targetPage = currentPage + 1;
            } else {
                targetPage = parseInt(pageAttr, 10);
            }

            if (targetPage !== currentPage) {
                renderPage(targetPage, true);
            }
        });
    }

    function initializeProductsUI(productsData) {
        const dataset = productsData || getProductsDataset();
        window.products = dataset;

        if (picksGrid) {
            renderHomepageFeaturedCards(dataset);
        }

        if (storeGrid) {
            currentFilteredProducts = [...dataset];
            filterProducts(currentCategory, currentSearchQuery);
        }

        updateCartBadge();
        updateAllCardsUI();
        updateFloatingCartBar();
    }

    if (window.productsPromise) {
        window.productsPromise.then(loadedProducts => {
            initializeProductsUI(loadedProducts);
        }).catch(err => {
            console.error("Products loader promise rejected:", err);
            initializeProductsUI(getProductsDataset());
        });
    } else {
        initializeProductsUI(getProductsDataset());
    }

    // ==========================================
    // Category Dropdown Toggle & Selection Filtering
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

                const selectedCategory = option.getAttribute("data-category");
                filterProducts(selectedCategory, undefined);
            });
        });
    }

    // ==========================================
    // Live Search Input Filtering & Debounce
    // ==========================================
    const storeSearchInput = document.getElementById("store-search-input");
    const storeSearchBtn = document.getElementById("store-search-btn");

    if (storeSearchInput) {
        let searchDebounceTimer = null;

        storeSearchInput.addEventListener("input", (e) => {
            const query = e.target.value;
            if (searchDebounceTimer) {
                clearTimeout(searchDebounceTimer);
            }
            searchDebounceTimer = setTimeout(() => {
                filterProducts(undefined, query);
            }, 180);
        });

        storeSearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (searchDebounceTimer) {
                    clearTimeout(searchDebounceTimer);
                }
                filterProducts(undefined, storeSearchInput.value);
            }
        });
    }

    if (storeSearchBtn && storeSearchInput) {
        storeSearchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            filterProducts(undefined, storeSearchInput.value);
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

                const productsData = window.products || (typeof products !== "undefined" && Array.isArray(products) ? products : []);
                if (Array.isArray(productsData)) {
                    const item = productsData.find(p => p.id === id);
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

        const formattedMessage = `Hi Bliss Fries and Bakes 👋 I'd like to place an order:

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

                const productsData = window.products || (typeof products !== "undefined" && Array.isArray(products) ? products : []);
                if (Array.isArray(productsData)) {
                    const item = productsData.find(p => p.id === id);
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
        // Verify cart 24h expiry before opening drawer
        loadCartFromStorage();
        updateCartBadge();
        updateAllCardsUI();
        updateFloatingCartBar();

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

            // Clear cart & update UI across page after sending order
            resetCartAfterOrder();
        });
    }

    // ==========================================
    // Contact Us Form Submission Handler
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("contact-name");
            const topicSelect = document.getElementById("contact-topic");
            const reachInput = document.getElementById("contact-reach");
            const messageTextarea = document.getElementById("contact-message");

            const name = nameInput ? nameInput.value.trim() : "";
            const topic = topicSelect ? topicSelect.value : "General question";
            const reach = reachInput ? reachInput.value.trim() : "";
            const message = messageTextarea ? messageTextarea.value.trim() : "";

            if (!message) {
                if (messageTextarea) {
                    messageTextarea.focus();
                }
                return;
            }

            const formattedName = name || "[not provided]";
            const formattedReach = reach || "[not provided]";

            const text = `Hi Bliss Fries and Bakes 👋\n${topic}\n\nName: ${formattedName}\nReach me at: ${formattedReach}\n\nMessage:\n${message}`;

            const encodedMessage = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, "_blank");

            // Reset all form fields back to empty/default state
            contactForm.reset();
            if (nameInput) nameInput.value = "";
            if (topicSelect) topicSelect.value = "General question";
            if (reachInput) reachInput.value = "";
            if (messageTextarea) messageTextarea.value = "";
        });
    }

});
