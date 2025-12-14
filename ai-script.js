// AI Breakthrough specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initQuantumParticles();
});

// Scroll animations for sections
function initScrollAnimations() {
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

    // Observe all cards and sections
    const elements = document.querySelectorAll('.mission-block, .focus-card, .quantum-item, .contact-card-ai');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Quantum particles animation
function initQuantumParticles() {
    const quantumVisual = document.querySelector('.quantum-visual');
    if (!quantumVisual) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: radial-gradient(circle, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.6));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: quantumFloat ${Math.random() * 5 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
        `;
        quantumVisual.appendChild(particle);
    }

    // Add keyframes for particle animation
    if (!document.getElementById('quantum-float-styles')) {
        const style = document.createElement('style');
        style.id = 'quantum-float-styles';
        style.textContent = `
            @keyframes quantumFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.getElementById('hamburger')?.classList.remove('active');
                }
            }
        }
    });
});

// Pillar items hover effect
document.querySelectorAll('.pillar-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Focus cards stagger animation
const focusCards = document.querySelectorAll('.focus-card');
focusCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aiHero = document.querySelector('.ai-hero');
    if (aiHero) {
        aiHero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Quantum icon interaction
const quantumIcon = document.querySelector('.quantum-icon-large');
if (quantumIcon) {
    quantumIcon.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.1) rotate(10deg)';
    });
    quantumIcon.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}
