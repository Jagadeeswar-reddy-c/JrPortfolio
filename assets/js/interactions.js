// ========================================
// INTERACTIONS - Scroll animations, filters, navigation
// ========================================

class Interactions {
    constructor() {
        this.init();
    }

    /**
     * Initialize all interactions
     */
    init() {
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupProjectFilters();
        this.setupSmoothScroll();
    }

    /**
     * Setup Intersection Observer for scroll-triggered animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with .reveal class
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Setup navigation scroll behavior
     */
    setupNavigation() {
        const nav = document.querySelector('.terminal-nav');
        const navToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        const navLinkItems = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isOpen = navLinks.classList.contains('active');
                navToggle.textContent = isOpen ? '[ CLOSE ]' : '[ MENU ]';
            });
        }

        // Close mobile menu on link click
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (navToggle) navToggle.textContent = '[ MENU ]';
            });
        });

        // Active section highlighting
        this.setupActiveSection();
    }

    /**
     * Highlight active section in navigation
     */
    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Setup project filtering
     */
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const tags = card.getAttribute('data-tags');

                    if (filter === 'all' || tags.includes(filter)) {
                        card.style.display = '';
                        card.style.animation = 'fadeInUp 0.4s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// ========================================
// MAIN APP INITIALIZATION
// ========================================

async function initApp() {
    console.log('🚀 Initializing portfolio...');

    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');

    try {
        // Simulated boot sequence messages
        const bootMessages = [
            '[ INITIALIZING SYSTEM... ]',
            '[ LOADING PROFILE DATA... ]',
            '[ RENDERING COMPONENTS... ]',
            '[ BOOT COMPLETE ]'
        ];

        for (let i = 0; i < bootMessages.length; i++) {
            if (loadingText) loadingText.textContent = bootMessages[i];
            await new Promise(resolve => setTimeout(resolve, 400));
        }

        // Load profile data
        const data = await dataLoader.loadProfile();

        // Render all sections
        const renderer = new Renderer(data);
        renderer.renderAll();

        // Initialize interactions
        new Interactions();

        // Remove loading screen
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 500);

        console.log('✨ Portfolio initialized successfully!');

    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        if (loadingText) loadingText.textContent = '[ ERROR: BOOT FAILED ]';
        setTimeout(() => {
            if (loadingScreen) loadingScreen.remove();
        }, 2000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
