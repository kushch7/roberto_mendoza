// ── Custom Cursor (desktop only) ──────────────────────────────────
(function () {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;

    document.addEventListener("mousemove", function (e) {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
    });

    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document
        .querySelectorAll(
            "a, button, .product-card, .trend-card, .journal-card",
        )
        .forEach(function (el) {
            el.addEventListener("mouseenter", function () {
                cursor.style.width = "20px";
                cursor.style.height = "20px";
                ring.style.width = "56px";
                ring.style.height = "56px";
            });
            el.addEventListener("mouseleave", function () {
                cursor.style.width = "10px";
                cursor.style.height = "10px";
                ring.style.width = "36px";
                ring.style.height = "36px";
            });
        });
})();

// ── Header scroll ─────────────────────────────────────────────────
(function () {
    const header = document.getElementById("header");
    if (!header) return;
    window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 80);
    });
})();

// ── Scroll reveal ─────────────────────────────────────────────────
(function () {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    reveals.forEach(function (el) {
        observer.observe(el);
    });
})();

// ── Mobile menu ───────────────────────────────────────────────────
(function () {
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const mobileNavClose = document.getElementById("mobileNavClose");
    const mobileNavOverlay = document.getElementById("mobileNavOverlay");
    if (!hamburger || !mobileNav) return;

    function openMenu() {
        mobileNav.classList.add("open");
        if (mobileNavOverlay) mobileNavOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    function closeMenu() {
        mobileNav.classList.remove("open");
        if (mobileNavOverlay) mobileNavOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", openMenu);
    if (mobileNavClose) mobileNavClose.addEventListener("click", closeMenu);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener("click", closeMenu);
    document.querySelectorAll(".mobile-links a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });
})();

// ── Shop filter (collections page) ────────────────────────────────
(function () {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const shopCards = document.querySelectorAll(".shop-card");
    const shopCountEl = document.getElementById("shopCount");
    if (!filterBtns.length || !shopCards.length) return;

    function updateCount(n) {
        if (shopCountEl) shopCountEl.textContent = n + " pieces";
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
            const cat = btn.getAttribute("data-filter");
            let visible = 0;
            shopCards.forEach(function (card) {
                if (
                    cat === "all" ||
                    card.getAttribute("data-category") === cat
                ) {
                    card.style.display = "";
                    visible++;
                } else {
                    card.style.display = "none";
                }
            });
            updateCount(visible);
        });
    });

    updateCount(shopCards.length);
})();
