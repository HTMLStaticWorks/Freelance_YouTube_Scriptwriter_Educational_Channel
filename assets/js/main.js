/**
 * scriptflow - Main JS
 * Core interactions for the YouTube Scriptwriter Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initToggles();
    initMobileMenu();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar-scriptflow');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.hamburger-toggle');
    const menu = document.querySelector('.offcanvas-sf');
    const backdrop = document.querySelector('.offcanvas-backdrop-sf');
    const links = document.querySelectorAll('.offcanvas-nav-sf .nav-link-scriptflow');

    if (!toggle || !menu || !backdrop) return;

    function toggleMenu() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close on resize if beyond breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100 && menu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scriptflow-card, .section-title, .timeline-item, .reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Theme and RTL Toggles
 */
function initToggles() {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.792 0 1.533-.16 2.27-.517a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.348 8.348 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06a.752.752 0 0 1 .876.218z"/></svg>`;

    function updateThemeIcons(isLight) {
        themeToggles.forEach(btn => {
            btn.innerHTML = isLight ? moonIcon : sunIcon;
        });
    }

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcons(true);
    } else {
        updateThemeIcons(false);
    }

    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    // Theme Toggle
    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeIcons(isLight);
        });
    });

    // RTL Toggle
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });
}
