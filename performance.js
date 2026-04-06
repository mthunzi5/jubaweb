// Performance optimizations for JUBA website

// Lazy load images using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger actual load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    }
});

// Prefetch DNS for external resources
function prefetchDNS() {
    const links = [
        'https://fonts.googleapis.com',
        'https://cdnjs.cloudflare.com'
    ];
    
    links.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Preconnect to critical third-party domains
function preconnect() {
    const preconnectDomains = [
        { href: 'https://fonts.googleapis.com', crossOrigin: true },
        { href: 'https://fonts.gstatic.com', crossOrigin: true }
    ];
    
    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain.href;
        if (domain.crossOrigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
prefetchDNS();
preconnect();

// Report Web Vitals if available
if ('web-vital' in window) {
    console.log('Performance monitoring enabled');
}
