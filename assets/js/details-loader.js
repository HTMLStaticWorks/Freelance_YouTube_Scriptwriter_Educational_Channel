/**
 * details-loader.js
 * Dynamically populates portfolio-details.html and blog-details.html
 * based on the ?id= parameter in the URL.
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id || !SF_DATA) return;

    // Detect page type
    const isPortfolio = window.location.pathname.includes('portfolio-details.html');
    const isBlog = window.location.pathname.includes('blog-details.html');

    if (isPortfolio && SF_DATA.portfolio[id]) {
        loadPortfolioDetails(SF_DATA.portfolio[id]);
    } else if (isBlog && SF_DATA.blog[id]) {
        loadBlogDetails(SF_DATA.blog[id]);
    }
});

function loadPortfolioDetails(data) {
    // Update Hero
    const title = document.querySelector('.inner-page-header h1');
    const subtitle = document.querySelector('.inner-page-header p');
    const heroImg = document.querySelector('.hero-bg-overlay');
    
    if (title) title.textContent = data.title;
    if (subtitle) subtitle.textContent = data.subtitle;
    if (heroImg) heroImg.src = data.heroImage;

    // Update Challenge
    const challengeText = document.querySelector('.scriptflow-card h3 + p');
    const challengeImg = document.querySelector('.details-image-card img'); // First image card
    
    if (challengeText) challengeText.textContent = data.challenge;
    if (challengeImg) challengeImg.src = data.challengeImage;

    // Update Strategy
    const strategyText = document.querySelector('.row.align-items-center h3 + p');
    const strategyImg = document.querySelectorAll('.details-image-card img')[1]; // Second image card
    
    if (strategyText) strategyText.textContent = data.strategy;
    if (strategyImg) strategyImg.src = data.strategyImage;

    // Update Hook
    const hookText = document.querySelector('.border-start p');
    if (hookText) hookText.textContent = `"${data.hook}"`;

    // Update Results
    const resultsImg = document.querySelectorAll('.details-image-card img')[2]; // Third image card
    if (resultsImg) resultsImg.src = data.resultsImage;

    // Update Stats
    const stats = document.querySelectorAll('.h2.text-cyan');
    if (stats.length >= 4) {
        stats[0].textContent = data.stats.views;
        stats[1].textContent = data.stats.retention;
        stats[2].textContent = data.stats.likes;
        stats[3].textContent = data.stats.ctr;
    }

    // Update Info Sidebar
    const infoValues = document.querySelectorAll('.scriptflow-card .fw-bold');
    if (infoValues.length >= 4) {
        infoValues[0].textContent = data.info.client;
        infoValues[1].textContent = data.info.date;
        infoValues[2].textContent = data.info.service;
        infoValues[3].textContent = data.info.niche;
    }
}

function loadBlogDetails(data) {
    // Update Hero
    const title = document.querySelector('.inner-page-header h1');
    const meta = document.querySelector('.inner-page-header .text-cyan.small');
    const heroImg = document.querySelector('.hero-bg-overlay');
    
    if (title) title.textContent = data.title;
    if (meta) meta.innerHTML = `${data.meta.split(' • ')[0]} <span class="blog-meta-sep"></span> ${data.meta.split(' • ')[1]}`;
    if (heroImg) heroImg.src = data.heroImage;

    // Update Featured Image
    const featuredImg = document.querySelector('.details-image-card img');
    if (featuredImg) featuredImg.src = data.heroImage;

    // Update Intro
    const intro = document.querySelector('article .lead');
    if (intro) intro.textContent = data.intro;

    // Update Sections
    const sectionHeads = document.querySelectorAll('article h3.text-cyan');
    const sectionTexts = document.querySelectorAll('article h3.text-cyan + p');

    if (sectionHeads.length >= 3) {
        sectionHeads[0].textContent = data.section1.h;
        sectionHeads[1].textContent = data.section2.h;
        sectionHeads[2].textContent = data.section3.h;
    }

    if (sectionTexts.length >= 3) {
        sectionTexts[0].textContent = data.section1.p;
        sectionTexts[1].textContent = data.section2.p;
        sectionTexts[2].textContent = data.section3.p;
    }

    // Update Retention Image
    const retentionImg = document.querySelectorAll('.details-image-card img')[1];
    if (retentionImg) retentionImg.src = "assets/images/retention-graph.png"; // Keep this consistent or make dynamic
}
