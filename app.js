document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initStaggeredAnimations();
    initFormHandling();
    initHeaderBehavior();
    initLoadingAnimations();
    initProcessStepAnimations();
    addRippleEffect();
    initLogoInteraction();
});

// Logo interaction
function initLogoInteraction() {
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    const logoImage = document.querySelector('.logo-image');
    
    if (logoPlaceholder) {
        logoPlaceholder.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Check if logo image has src and show/hide accordingly
        if (logoImage) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                        const src = logoImage.getAttribute('src');
                        if (src && src !== '') {
                            logoImage.style.display = 'block';
                        } else {
                            logoImage.style.display = 'none';
                        }
                    }
                });
            });
            
            observer.observe(logoImage, {
                attributes: true,
                attributeFilter: ['src']
            });
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle all links that start with #
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Add click animation to link
            link.style.transform = 'scale(0.95)';
            link.style.transition = 'transform 0.1s ease';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.card-hover, .service-card, .direction-card, .news-card, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.transform = 'translateY(0)';
                        child.style.opacity = '1';
                    }, index * 100);
                });
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.section-header, .services__grid, .directions__grid, .process__steps, .news__grid, .contact__content'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Special animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
    
    // Special animation for direction cards
    const directionCards = document.querySelectorAll('.direction-card');
    directionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.15}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
    
    // Special animation for news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(' + (index % 2 === 0 ? '-30px' : '30px') + ')';
        card.style.transition = 'all 0.8s ease-out';
        card.style.transitionDelay = `${index * 0.2}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero__background');
    
    if (!heroBackground) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Staggered animations for grid items
function initStaggeredAnimations() {
    const gridContainers = document.querySelectorAll('.services__grid, .directions__grid, .news__grid');
    
    gridContainers.forEach(container => {
        const items = container.querySelectorAll('.card-hover');
        
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease-out';
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(33, 128, 141, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    });
}

// Form handling with animations
function initFormHandling() {
    const form = document.querySelector('.form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-control');
    const submitBtn = form.querySelector('.btn');
    
    // Add focus animations to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px rgba(33, 128, 141, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
        
        // Add typing animation effect
        input.addEventListener('input', function() {
            this.style.transform = 'scale(1.01)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animate submit button
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Add loading animation
        const originalText = 'Отправить сообщение';
        let dots = '';
        const loadingInterval = setInterval(() => {
            dots = dots.length >= 3 ? '' : dots + '.';
            submitBtn.textContent = `Отправка${dots}`;
        }, 300);
        
        // Simulate form submission
        setTimeout(() => {
            clearInterval(loadingInterval);
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.background = 'var(--color-success)';
            submitBtn.textContent = '✓ Отправлено!';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.style.background = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Add success notification
                showNotification('Сообщение успешно отправлено!', 'success');
            }, 2000);
        }, 1500);
    });
}

// Header scroll behavior
function initHeaderBehavior() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(19, 52, 59, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(19, 52, 59, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header when scrolling down fast, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Loading animations
function initLoadingAnimations() {
    // Animate hero stats on load with updated values
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        const value = stat.querySelector('.stat__value');
        const finalValue = value.textContent.trim();
        
        // Handle different stat types
        if (finalValue === '500+') {
            animateCounter(value, 0, 500, 1500, '+');
        } else if (finalValue === '1000+') {
            animateCounter(value, 0, 1000, 2000, '+');
        } else if (finalValue === '24/7') {
            // Special animation for 24/7
            value.style.opacity = '0';
            setTimeout(() => {
                value.style.transition = 'opacity 0.8s ease-out';
                value.style.opacity = '1';
                value.textContent = '24/7';
            }, 800 + (index * 200));
        }
    });
}

// Enhanced counter animation utility
function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    element.style.opacity = '0';
    element.style.transform = 'scale(0.5)';
    element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }, 300);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '33, 128, 141' : '33, 128, 141';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: rgba(${bgColor}, 1);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease-out;
        font-weight: 500;
        font-family: var(--font-family-base);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced hover effects for buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// Add ripple effect to cards
function addRippleEffect() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Smooth reveal animation for process steps
function initProcessStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                const number = step.querySelector('.step__number');
                const content = step.querySelector('.step__content');
                
                // Animate step number
                setTimeout(() => {
                    number.style.transform = 'scale(1.2) rotate(360deg)';
                    setTimeout(() => {
                        number.style.transform = 'scale(1) rotate(360deg)';
                    }, 300);
                }, 200);
                
                // Animate content
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateX(0)';
                }, 400);
                
                stepObserver.unobserve(step);
            }
        });
    }, { threshold: 0.5 });
    
    steps.forEach(step => {
        const content = step.querySelector('.step__content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(20px)';
            content.style.transition = 'all 0.6s ease-out';
        }
        
        stepObserver.observe(step);
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    let currentSection = '';
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Performance optimization: throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        updateActiveNavLink();
    }, 10);
});

// Add CSS for ripple animation and active nav links
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.nav__link.active {
    color: var(--color-primary) !important;
}

.nav__link.active::after {
    width: 100% !important;
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize button effects when DOM is ready
document.addEventListener('DOMContentLoaded', initButtonEffects);