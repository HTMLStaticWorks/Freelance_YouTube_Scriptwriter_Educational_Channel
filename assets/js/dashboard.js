/**
 * scriptflow - Dashboard JS
 * UI interactions for the client dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initCharts();
    initTheme();
    initRTL();
});

/**
 * Theme Toggle
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.792 0 1.533-.16 2.27-.517a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.348 8.348 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06a.752.752 0 0 1 .876.218z"/></svg>`;

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.innerHTML = moonIcon;
    } else {
        if (themeToggle) themeToggle.innerHTML = sunIcon;
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update icon
            themeToggle.innerHTML = isLight ? moonIcon : sunIcon;
        });
    }
}

/**
 * sidebar toggle
 */
function initSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (backdrop) backdrop.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        });
    }
}

/**
 * Initialize Charts
 */
function initCharts() {
    if (typeof DashboardCharts !== 'undefined') {
        DashboardCharts.init();
        console.log('Dashboard Charts Initialized');
    } else {
        console.warn('DashboardCharts not found');
    }
}

/**
 * RTL Toggle Functionality
 */
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;
    const bootstrapLink = document.querySelector('link[href*="bootstrap.min.css"]');
    
    const ltrIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    const rtlIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6H4M20 12H4M20 18H4"/></svg>`;

    function setRTL(isRTL) {
        if (isRTL) {
            html.setAttribute('dir', 'rtl');
            if (bootstrapLink) {
                bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
            }
            if (rtlToggle) {
                rtlToggle.innerHTML = `<span>LTR</span>`;
                rtlToggle.setAttribute('title', 'Switch to LTR');
            }
        } else {
            html.setAttribute('dir', 'ltr');
            if (bootstrapLink) {
                bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
            if (rtlToggle) {
                rtlToggle.innerHTML = `<span>RTL</span>`;
                rtlToggle.setAttribute('title', 'Switch to RTL');
            }
        }
        localStorage.setItem('dashboard-rtl', isRTL ? 'true' : 'false');
    }

    // Initialize state
    const savedRTL = localStorage.getItem('dashboard-rtl') === 'true';
    setRTL(savedRTL);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentRTL = html.getAttribute('dir') === 'rtl';
            setRTL(!currentRTL);
        });
    }
}
