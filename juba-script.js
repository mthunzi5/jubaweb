// JUBA Consulting Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
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
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.juba-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Hero Typing animation
    const heroTypingElement = document.getElementById('heroTyping');
    if (heroTypingElement) {
        const texts = [
            'Skills Development',
            'AI Innovation',
            'Technology Solutions',
            'Workforce Transformation',
            'Digital Empowerment',
            'Sustainable Growth'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroTypingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroTypingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of text
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    }
    
    // About section typing animation (if exists)
    const aboutTypingElement = document.querySelector('.juba-typing');
    if (aboutTypingElement) {
        const aboutTexts = [
            'Strategic Business Solutions',
            'Skills Development Excellence',
            'AI Innovation & Education',
            'ICT Technology Solutions',
            'Empowering Communities'
        ];
        let aboutTextIndex = 0;
        let aboutCharIndex = 0;
        let aboutIsDeleting = false;
        let aboutTypingSpeed = 100;
        
        function typeAbout() {
            const currentText = aboutTexts[aboutTextIndex];
            
            if (aboutIsDeleting) {
                aboutTypingElement.textContent = currentText.substring(0, aboutCharIndex - 1);
                aboutCharIndex--;
                aboutTypingSpeed = 50;
            } else {
                aboutTypingElement.textContent = currentText.substring(0, aboutCharIndex + 1);
                aboutCharIndex++;
                aboutTypingSpeed = 100;
            }
            
            if (!aboutIsDeleting && aboutCharIndex === currentText.length) {
                aboutTypingSpeed = 2000;
                aboutIsDeleting = true;
            } else if (aboutIsDeleting && aboutCharIndex === 0) {
                aboutIsDeleting = false;
                aboutTextIndex = (aboutTextIndex + 1) % aboutTexts.length;
                aboutTypingSpeed = 500;
            }
            
            setTimeout(typeAbout, aboutTypingSpeed);
        }
        
        setTimeout(typeAbout, 1500);
    }
    
    // Scroll animations for sections
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
    
    // Observe value cards and division blocks
    const animatedElements = document.querySelectorAll('.value-card, .division-block, .contact-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Division cards hover effect
    document.querySelectorAll('.division-block').forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Value cards stagger animation
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
