/* =========================================================
   PRASHANTHI UI/UX PORTFOLIO
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = navMenu.classList.contains("open")
                    ? "ri-close-line"
                    : "ri-menu-3-line";
            }

        });

        // Close menu when clicking a navigation link
        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "ri-menu-3-line";
                }

            });

        });

    }
    
/* =====================================================
   NAVBAR - ACTIVE UNDERLINE ON SCROLL
===================================================== */

const navLinks = document.querySelectorAll(".nav-link");

const sectionLinks = Array.from(navLinks)
    .map(link => {
        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return null;
        }

        const section = document.getElementById(href.substring(1));

        return section ? { link, section } : null;
    })
    .filter(Boolean);

function setActiveLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    if (activeLink) {
        activeLink.classList.add("active");
    }
}

function updateActiveSection() {
    if (!sectionLinks.length) return;

    const header = document.querySelector("header, .navbar, nav");
    const headerHeight = header
        ? header.getBoundingClientRect().height
        : 100;

    const scrollPosition = window.scrollY + headerHeight + 100;

    let currentSection = sectionLinks[0];

    sectionLinks.forEach(item => {
        if (item.section.offsetTop <= scrollPosition) {
            currentSection = item;
        }
    });

    // Select the last section when reaching the bottom of the page
    if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
    ) {
        currentSection = sectionLinks[sectionLinks.length - 1];
    }

    setActiveLink(currentSection.link);
}

// Update underline when clicking a navigation link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        setActiveLink(link);
    });
});

// Update underline while scrolling
window.addEventListener("scroll", updateActiveSection, {
    passive: true
});

// Set the correct underline when the page loads
updateActiveSection();

// Recalculate after the page finishes loading
window.addEventListener("load", updateActiveSection);


   const typingText = document.querySelector(".typing-text");

const words = [
    "UI/UX Designer",
    "Graphic Designer",
    "Website Designer",
    "Visual Designer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const deletingSpeed = 60;
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 500;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent = currentWord.substring(
            0,
            charIndex + 1
        );

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, pauseAfterTyping);
            return;
        }

        setTimeout(typeEffect, typingSpeed);

    } else {

        typingText.textContent = currentWord.substring(
            0,
            charIndex - 1
        );

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

            setTimeout(typeEffect, pauseAfterDeleting);
            return;
        }

        setTimeout(typeEffect, deletingSpeed);
    }
}

typeEffect();

/* =========================================================
   ABOUT ME - SCROLL ANIMATION
========================================================= */


document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) return;

    const aboutElements = aboutSection.querySelectorAll(
        ".about-left, .about-right"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Show the content immediately if animations are disabled.
    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        aboutElements.forEach(function (element) {
            element.classList.add("about-visible");
        });
        return;
    }

    // Add the animation-ready class.
    aboutSection.classList.add("about-animation-ready");

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("about-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    aboutElements.forEach(function (element) {
        observer.observe(element);
    });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active button
        filterButtons.forEach((btn) => {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        // Filter project cards
        projectCards.forEach((card) => {
            const categories = card.dataset.category.split(" ");

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            card.hidden = !shouldShow;

            if (shouldShow) {
                card.style.animation = "none";
                void card.offsetWidth;
                card.style.animation = "";
            }
        });

    });
});


/* ==============================
   SKILLS ANIMATION
============================== */

(function () {
    function initSkillsAnimation() {
        const skillsSection = document.querySelector("#skills");

        if (!skillsSection || skillsSection.dataset.animationReady) {
            return;
        }

        skillsSection.dataset.animationReady = "true";

        const skillFills = skillsSection.querySelectorAll(".skill-fill");

        // Read and store target percentages
        skillFills.forEach(function (fill) {
            const level = parseFloat(fill.dataset.level) || 0;
            const percentage = Math.min(100, Math.max(0, level));

            fill.dataset.target = percentage + "%";
            fill.style.width = "0%";
        });

        let animationRun = 0;

        function playAnimation() {
            const currentRun = ++animationRun;

            // Cancel previous staggered animations and reset bars
            skillFills.forEach(function (fill) {
                fill.classList.add("is-resetting");
                fill.style.width = "0%";
            });

            // Force the browser to apply the reset
            void skillsSection.offsetWidth;

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    // Ignore outdated animation callbacks
                    if (currentRun !== animationRun) return;

                    skillFills.forEach(function (fill, index) {
                        setTimeout(function () {
                            if (currentRun !== animationRun) return;

                            fill.classList.remove("is-resetting");
                            fill.style.width = fill.dataset.target;
                        }, index * 80);
                    });
                });
            });
        }

        // Replay when the pointer enters the Skills section
        skillsSection.addEventListener("mouseenter", playAnimation);

        // Replay when clicking a Skills navigation link
        document.querySelectorAll(
            'a[href="#skills"], a[href$="#skills"]'
        ).forEach(function (link) {
            link.addEventListener("click", playAnimation);
        });

        // Initial animation when the section enters the viewport
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            playAnimation();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(skillsSection);
        } else {
            playAnimation();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initSkillsAnimation
        );
    } else {
        initSkillsAnimation();
    }
})();


/* ==========================================
   EXPERIENCE SECTION — TOGGLE FUNCTIONALITY
========================================== */

function initExperienceSection() {
    const buttons = document.querySelectorAll(".experience-toggle");

    buttons.forEach((button) => {
        // Prevent duplicate event listeners
        if (button.dataset.toggleInitialized === "true") {
            return;
        }

        button.dataset.toggleInitialized = "true";

        button.addEventListener("click", function () {
            const detailsId = this.getAttribute("aria-controls");
            const details = document.getElementById(detailsId);

            if (!details) {
                console.error("Cannot find experience details:", detailsId);
                return;
            }

            const isOpen = details.classList.contains("is-open");
            const shouldOpen = !isOpen;

            // Toggle responsibilities
            details.classList.toggle("is-open", shouldOpen);

            // Update accessibility state
            this.setAttribute("aria-expanded", String(shouldOpen));

            // Update button text
            const text = this.querySelector("span");

            if (text) {
                text.textContent = shouldOpen
                    ? "Hide Responsibilities"
                    : "View Responsibilities";
            }

            // Update arrow direction
            const arrow = this.querySelector("svg");

            if (arrow) {
                arrow.style.transform = shouldOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)";
            }
        });
    });
}

// Initialize after HTML is available
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initExperienceSection,
        { once: true }
    );
} else {
    initExperienceSection();
}

// Initialize Lucide icons if available
if (window.lucide) {
    window.lucide.createIcons();
}


document.addEventListener("DOMContentLoaded", () => {
    const visual = document.querySelector(".connect-visual");
    const card = document.querySelector(".design-card");

    if (!visual || !card) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    // Disable the 3D effect on touch devices or when reduced motion is preferred.
    if (reduceMotion.matches || !supportsHover.matches) return;

    visual.addEventListener("pointermove", (event) => {
        const rect = visual.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(-2deg)
        `;
    });

    visual.addEventListener("pointerleave", () => {
        card.style.transform = "";
    });
});

});

