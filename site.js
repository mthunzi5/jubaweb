// JUBA CONSULTANTS — shared site behaviour (nav, reveal, back-to-top, typing, modal)

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

    /* Sticky nav shadow on scroll */
    var nav = document.querySelector('.site-nav');
    if (nav) {
        var onNavScroll = function () {
            nav.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onNavScroll();
        window.addEventListener('scroll', onNavScroll, { passive: true });
    }

    /* Mobile hamburger menu */
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            var isActive = navMenu.classList.toggle('is-active');
            hamburger.classList.toggle('is-active', isActive);
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
        navMenu.querySelectorAll('.nav-link, .nav-dropdown__item').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('is-active');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* Mobile dropdown (Our Divisions) */
    var dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        var toggle = dropdown.querySelector('.nav-dropdown__toggle');
        if (toggle) {
            toggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                }
            });
        }
    }

    /* Back-to-top button */
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        var onBackToTopScroll = function () {
            backToTop.classList.toggle('is-visible', window.scrollY > 400);
        };
        onBackToTopScroll();
        window.addEventListener('scroll', onBackToTopScroll, { passive: true });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* Reveal-on-scroll */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach(function (el) { io.observe(el); });
        } else {
            revealEls.forEach(function (el) { el.classList.add('is-visible'); });
        }
    }

    /* Typing text — any element with [data-typing] and comma-separated data-phrases */
    document.querySelectorAll('[data-typing]').forEach(function (el) {
        var phrases = (el.getAttribute('data-phrases') || '').split('|').filter(Boolean);
        if (!phrases.length) return;
        var phraseIndex = 0, charIndex = 0, isDeleting = false;

        function tick() {
            var current = phrases[phraseIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            el.textContent = current.substring(0, charIndex);

            var speed = isDeleting ? 45 : 90;
            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                speed = 1600;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
            }
            setTimeout(tick, speed);
        }
        setTimeout(tick, 800);
    });

    /* Services modal (skills-academy.html) */
    var modal = document.getElementById('servicesModal');
    if (modal) {
        var openBtn = document.getElementById('servicesModalBtn');
        var closeBtn = document.getElementById('modalClose');
        var overlay = modal.querySelector('.modal-overlay');

        function openModal() {
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            modal.classList.remove('is-active');
            document.body.style.overflow = '';
        }
        if (openBtn) openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        modal.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', closeModal);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
        });
    }
});
