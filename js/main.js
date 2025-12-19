// Component loader
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
            // Start hero animations after loader is removed
            startHeroAnimations();
        }, 500);
    }
}

// Start hero animations
function startHeroAnimations() {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCta = document.getElementById('hero-cta');
    
    if (heroTitle) {
        heroTitle.classList.add('hero-title-animate');
    }
    if (heroSubtitle) {
        heroSubtitle.classList.add('hero-subtitle-animate');
    }
    if (heroCta) {
        heroCta.classList.add('hero-cta-animate');
        
        // Add click event to CTA button
        heroCta.addEventListener('click', handleCtaClick);
    }
}

// Handle CTA button click
function handleCtaClick() {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCta = document.getElementById('hero-cta');
    
    // Add fade out animation
    if (heroTitle) heroTitle.classList.add('fade-out-up');
    if (heroSubtitle) heroSubtitle.classList.add('fade-out-up');
    if (heroCta) heroCta.classList.add('fade-out-up');
    
    // Scroll to about section after animation
    setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 800);
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load loader first
    await loadComponent('loader-component', './components/loader.html');
    
    // Load header
    await loadComponent('header-component', './components/header.html');
    
    // Load hero section
    await loadComponent('hero-component', './components/hero.html');
    
    // Load about section
    await loadComponent('about-component', './components/about.html');
    
    // Hide loading screen after 2.5 seconds
    setTimeout(() => {
        hideLoadingScreen();
    }, 2500);
});
