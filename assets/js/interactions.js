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
        this.animateHeroSequence();
    }

    /**
     * Animate hero section sequence
     */
    animateHeroSequence() {
        const elements = [
            '.hero-greeting',
            '.hero-name',
            '.hero-title',
            '.hero-description',
            '.hero-metrics',
            '.hero-cta'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.classList.add('animate-fade-in-up');
                }, index * 150);
            }
        });
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
        const nav = document.querySelector('.nav');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navLinkItems = document.querySelectorAll('.nav-link');

        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isOpen = navLinks.classList.contains('active');
                navToggle.textContent = isOpen ? '✕' : '☰';
            });
        }

        // Close mobile menu on link click
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (navToggle) navToggle.textContent = '☰';
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
                        card.style.animation = 'scaleIn 0.4s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Add parallax effect to background
     */
    setupParallax() {
        const background = document.querySelector('.animated-background');
        if (!background) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// ========================================
// MAIN APP INITIALIZATION
// ========================================

async function initApp() {
    console.log('🚀 Initializing portfolio...');

    try {
        // Show loading state
        document.body.insertAdjacentHTML('beforeend', `
      <div id="loading" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
      ">
        <div style="text-align: center;">
          <div style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(102, 126, 234, 0.2);
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          "></div>
          <p style="color: #667eea; font-size: 1.2rem;">Loading Portfolio...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `);

        // Load profile data
        const data = await dataLoader.loadProfile();

        // Render all sections
        const renderer = new Renderer(data);
        renderer.renderAll();

        // Initialize interactions
        new Interactions();

        // Remove loading screen
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => loading.remove(), 500);
            }
        }, 800);

        console.log('✨ Portfolio initialized successfully!');

    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        const loading = document.getElementById('loading');
        if (loading) loading.remove();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
