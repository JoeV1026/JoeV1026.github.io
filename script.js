// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const lightIcon = themeToggle.querySelector('.light-icon');
    const darkIcon = themeToggle.querySelector('.dark-icon');

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        document.body.classList.remove('light-mode');
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        
        // Toggle icons
        if (isLightMode) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
        navbar.style.borderBottom = '1px solid rgba(255, 0, 255, 0.5)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    }
});

// Removed excessive glitch effects for better readability and professionalism

// Intersection Observer for fade-in animations with glitch
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Typing Effect with Multiple Phrases
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    // Array of phrases to cycle through
    const phrases = [
        'Aspiring Software Developer',
        'Aspiring Student Intern',
        'Full-Stack Developer',
        'Computer Science Student',
        'Problem Solver',
        'Tech Enthusiast',
        'Code Creator',
        'Innovation Seeker',
        'Algorithm Designer',
        'System Architect'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && charIndex < currentPhrase.length) {
            // Typing
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80 + Math.random() * 40; // Random speed variation
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30 + Math.random() * 30; // Faster deletion
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing, wait then start deleting
            typingSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 1000);
});

// Projects Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('projectsSlider');
    const projectsGrid = slider?.querySelector('.projects-grid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slider || !projectsGrid || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = projectsGrid.querySelectorAll('.project-card');
    const cardWidth = cards[0]?.offsetWidth || 320;
    const gap = 32; // 2rem gap
    const cardWidthWithGap = cardWidth + gap;
    const visibleCards = Math.floor(slider.offsetWidth / cardWidthWithGap);
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    function updateSlider() {
        const translateX = -currentIndex * cardWidthWithGap;
        projectsGrid.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
    
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardWidth = cards[0]?.offsetWidth || 320;
            const newCardWidthWithGap = newCardWidth + gap;
            const newVisibleCards = Math.floor(slider.offsetWidth / newCardWidthWithGap);
            const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
            
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }
            updateSlider();
        }, 250);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize
    updateSlider();
});

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.expand-btn');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Prevent body scroll when modal is open (works on mobile too)
    function preventBodyScroll() {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }
    
    function restoreBodyScroll() {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
    
    // Function to open modal
    function openModal(button) {
        const projectId = button.getAttribute('data-project');
        const modal = document.getElementById(`modal-${projectId}`);
        
        if (modal) {
            modal.classList.add('active');
            preventBodyScroll();
            // Scroll modal to top on mobile
            setTimeout(() => {
                modal.scrollTop = 0;
            }, 100);
        }
    }
    
    // Open modal when expand button is clicked
    expandButtons.forEach(button => {
        let touchStartTime = 0;
        let hasMoved = false;
        let lastTouchHandled = false;
        
        // Track touch start
        button.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            hasMoved = false;
            lastTouchHandled = false;
        }, { passive: true });
        
        // Track if user moved finger (to distinguish from tap)
        button.addEventListener('touchmove', () => {
            hasMoved = true;
        }, { passive: true });
        
        // Handle touch end
        button.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            // Only trigger if it was a quick tap (not a long press or swipe)
            if (!hasMoved && touchDuration < 300) {
                e.preventDefault();
                e.stopPropagation();
                lastTouchHandled = true;
                openModal(button);
                // Reset after a short delay to allow click event to check it
                setTimeout(() => {
                    lastTouchHandled = false;
                }, 300);
            }
        }, { passive: false });
        
        // Handle click (for desktop and as fallback for mobile browsers that don't fire touchend properly)
        button.addEventListener('click', (e) => {
            // If touch was already handled, prevent click from firing to avoid double-trigger
            if (lastTouchHandled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            openModal(button);
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modal = button.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                restoreBodyScroll();
            }
        });
        
        // Touch support for close button
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modal = button.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                restoreBodyScroll();
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                restoreBodyScroll();
            }
        });
        
        // Touch support for outside click
        modal.addEventListener('touchend', (e) => {
            if (e.target === modal) {
                e.preventDefault();
                modal.classList.remove('active');
                restoreBodyScroll();
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    restoreBodyScroll();
                }
            });
        }
    });
    
    // Prevent modal content clicks from closing modal
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            modalContent.addEventListener('touchend', (e) => {
                e.stopPropagation();
            });
        }
    });
});

// Console message with glitch theme
console.log('%c╔════════════════════════════════════════╗', 'color: #00ffff; font-family: monospace;');
console.log('%c║   CS PORTFOLIO - GLITCH MODE ACTIVE    ║', 'color: #00ffff; font-family: monospace;');
console.log('%c║   INITIALIZING DIGITAL INTERFACE...   ║', 'color: #00ffff; font-family: monospace;');
console.log('%c╚════════════════════════════════════════╝', 'color: #00ffff; font-family: monospace;');
console.log('%c>> SYSTEM STATUS: OPERATIONAL', 'color: #00ff00; font-family: monospace; font-weight: bold;');
console.log('%c>> GLITCH EFFECTS: ENABLED', 'color: #ff00ff; font-family: monospace; font-weight: bold;');
console.log('%c>> Welcome to the matrix, developer.', 'color: #ffff00; font-family: monospace;');
