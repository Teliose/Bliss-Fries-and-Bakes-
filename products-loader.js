/**
 * Bliss Fries & Bakes - Shared Products Loader Module
 * 
 * Fetches product catalog live from Google Sheets CSV source via PapaParse.
 * Implements a multi-tiered resilience fallback system:
 *   1. Live fetch with 5-second timeout
 *   2. Cached data in localStorage ('blissProductCache')
 *   3. Static fallback array from products.js ('window.products')
 */

(function () {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fawaFA2re4BWA2kVNaxBgnR4Kr9KoLpYHY0mAu52guK6Gp4wL2-196J5cWiiJbDtcWNRTUKUth6Z/pub?gid=24127745&single=true&output=csv";
    const CACHE_KEY = "blissProductCache";
    const FETCH_TIMEOUT_MS = 5000;

    /**
     * Parses raw CSV text into normalized product objects.
     * @param {string} csvText
     * @returns {Array<Object>}
     */
    function parseCSVData(csvText) {
        if (typeof Papa === "undefined") {
            throw new Error("PapaParse CDN is not loaded.");
        }

        const parseResult = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        if (!parseResult.data || !Array.isArray(parseResult.data)) {
            throw new Error("Invalid CSV data format.");
        }

        return parseResult.data
            .filter(row => row && row.id && row.title)
            .map(row => {
                const rawPrice = row.price ? String(row.price).replace(/[^0-9.]/g, '') : '0';
                const parsedPrice = parseFloat(rawPrice);
                return {
                    id: String(row.id).trim(),
                    title: String(row.title).trim(),
                    description: String(row.description || '').trim(),
                    price: isNaN(parsedPrice) ? 0 : parsedPrice,
                    image: String(row.image || '').trim(),
                    category: String(row.category || '').trim()
                };
            });
    }

    /**
     * Attempts to fetch live CSV data with a timeout.
     * @returns {Promise<Array<Object>>}
     */
    async function fetchLiveProducts() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

        try {
            const response = await fetch(CSV_URL, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const csvText = await response.text();
            const loadedProducts = parseCSVData(csvText);

            if (!loadedProducts || loadedProducts.length === 0) {
                throw new Error("Parsed product array is empty.");
            }

            // Save to localStorage cache on success
            try {
                const cachePayload = {
                    timestamp: Date.now(),
                    data: loadedProducts
                };
                localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
            } catch (cacheErr) {
                console.warn("Could not save products to localStorage cache:", cacheErr);
            }

            return loadedProducts;
        } catch (err) {
            clearTimeout(timeoutId);
            throw err;
        }
    }

    /**
     * Tries loading product data from localStorage cache.
     * @returns {Array<Object>|null}
     */
    function getCachedProducts() {
        try {
            const rawCache = localStorage.getItem(CACHE_KEY);
            if (rawCache) {
                const parsed = JSON.parse(rawCache);
                if (parsed && Array.isArray(parsed.data) && parsed.data.length > 0) {
                    console.log("Using cached product catalog from localStorage.");
                    return parsed.data;
                }
            }
        } catch (e) {
            console.warn("Failed to read product cache from localStorage:", e);
        }
        return null;
    }

    /**
     * Main loader function that enforces resilience hierarchy.
     * @returns {Promise<Array<Object>>}
     */
    async function loadProducts() {
        try {
            const liveProducts = await fetchLiveProducts();
            window.products = liveProducts;
            return liveProducts;
        } catch (fetchError) {
            console.warn("Live product fetch failed/timed out, checking cache:", fetchError.message);

            const cached = getCachedProducts();
            if (cached) {
                window.products = cached;
                return cached;
            }

            console.warn("No cache available. Falling back to bundled products.js static dataset.");
            if (typeof window.products !== "undefined" && Array.isArray(window.products)) {
                return window.products;
            }

            return [];
        }
    }

    // Expose loader promise on window object
    window.productsPromise = loadProducts();
})();
