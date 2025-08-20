// Baisa Global Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scrolling for navigation links (including footer links)
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        let currentActiveSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 253, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    function handleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.service__card, .center__card, .news__card, .stat-card, .step');
        
        animatedElements.forEach(element => {
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
            
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification__close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles for notification
        const bgColor = type === 'success' ? '#10b981' : '#ef4444';
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            max-width: 400px;
            background: ${bgColor};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            font-size: 14px;
        `;

        const content = notification.querySelector('.notification__content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `;

        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            font-size: 16px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button functionality
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Contact form handling
    const contactForm = document.querySelector('.feedback-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Simple validation
            if (!name || !email || !phone || !message) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            this.reset();
        });
    }

    // Resume form handling
    const resumeForm = document.querySelector('.resume-form');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            
            // Simple validation
            if (!name || !email || !phone) {
                showNotification('Пожалуйста, заполните обязательные поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Резюме отправлено! Мы рассмотрим вашу кандидатуру и свяжемся с вами.', 'success');
            this.reset();
        });
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service__card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Center cards hover effects
    const centerCards = document.querySelectorAll('.center__card');
    centerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'var(--color-primary)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'var(--color-card-border)';
        });
    });

    // News card hover effects
    const newsCards = document.querySelectorAll('.news__card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            if (!counter.dataset.animated) {
                const text = counter.textContent;
                const hasPlus = text.includes('+');
                const hasSlash = text.includes('/');
                
                let target = 0;
                if (hasSlash) {
                    // Handle "24/7" case
                    counter.dataset.animated = 'true';
                    return;
                } else {
                    target = parseInt(text);
                }
                
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current) + (hasPlus ? '+' : '');
                    }
                }, 40);
                
                counter.dataset.animated = 'true';
            }
        });
    }

    // Check if stats are in viewport
    function checkStatsInView() {
        const statsSection = document.querySelector('.hero__stats');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
            }
        }
    }

    // Parallax effect for hero section
    function handleParallax() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    }

    // Logo fallback handling
    function handleLogoError() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('error', function() {
                // If logo fails to load, create a text fallback
                const logoContainer = this.parentElement;
                const fallbackText = document.createElement('h2');
                fallbackText.textContent = 'Baisa Global';
                fallbackText.style.cssText = `
                    color: var(--color-primary);
                    font-size: var(--font-size-3xl);
                    font-weight: var(--font-weight-bold);
                    margin: 0;
                    transition: transform 0.3s ease;
                `;
                
                // Add hover effect to fallback text
                fallbackText.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                fallbackText.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
                
                logoContainer.replaceChild(fallbackText, this);
            });
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        handleHeaderScroll();
        handleBackToTopButton();
        animateOnScroll();
        handleParallax();
        checkStatsInView();
    });

    // Initial calls
    updateActiveNavLink();
    handleHeaderScroll();
    handleBackToTopButton();
    animateOnScroll();
    checkStatsInView();
    handleLogoError();

    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.classList.add('focused');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.classList.remove('focused');
                if (this.value === '') {
                    this.parentElement.classList.remove('filled');
                } else {
                    this.parentElement.classList.add('filled');
                }
            }
        });

        // Check if input has value on load
        if (input.value !== '') {
            if (input.parentElement) {
                input.parentElement.classList.add('filled');
            }
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Touch support for mobile devices
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // Close mobile menu on upward swipe
        if (touchDiff > 50 && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Console message for developers
    console.log('%c🚀 Baisa Global Website Loaded Successfully!', 'color: #1fb8cd; font-size: 16px; font-weight: bold;');
    console.log('%cПоставщик оборудования и запчастей для нефтегазовой отрасли', 'color: #5e8240; font-size: 12px;');
});

// Utility functions
window.BaisaGlobal = {
    // Smooth scroll to element
    scrollTo: function(elementId) {
        const element = document.querySelector(elementId);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Get company info
    getCompanyInfo: function() {
        return {
            name: 'Baisa Global',
            fullName: 'ТОО "Байса Глобал"',
            phone: '+7 777 666 55 16',
            email: 'Arsen@baisaglobal.kz',
            address: 'Алматы, проспект Аль-Фараби, 7, к5а',
            bin: '220540015576'
        };
    }
};
// Work Process Animation
function animateProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    processSteps.forEach(step => {
        observer.observe(step);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateProcessSteps();
});
