// 🌐 Network Activity Monitor
(function() {
    'use strict';
    
    const ALLOWED_DOMAINS = [
        'tether-usdt-flash.github.io',
        'cdn.tailwindcss.com',
        'cdnjs.cloudflare.com'
    ];
    
    // Monitor Fetch API
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        const domain = new URL(url, location.href).hostname;
        
        if (!ALLOWED_DOMAINS.some(d => domain.includes(d))) {
            console.warn('Blocked request to:', domain);
            return Promise.reject('Blocked');
        }
        
        return originalFetch.apply(this, args);
    };
    
    // Monitor XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        const domain = new URL(url, location.href).hostname;
        
        if (!ALLOWED_DOMAINS.some(d => domain.includes(d))) {
            console.warn('Blocked XHR to:', domain);
            throw new Error('Blocked');
        }
        
        return originalOpen.apply(this, arguments);
    };
    
    // Monitor WebSocket
    const originalWebSocket = window.WebSocket;
    window.WebSocket = function(url) {
        const domain = new URL(url).hostname;
        
        if (!ALLOWED_DOMAINS.some(d => domain.includes(d))) {
            console.warn('Blocked WebSocket to:', domain);
            throw new Error('Blocked');
        }
        
        return new originalWebSocket(url);
    };
    
    // Monitor Script Injection
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT') {
                    const src = node.src || '';
                    if (src && !ALLOWED_DOMAINS.some(d => src.includes(d))) {
                        console.warn('Blocked script:', src);
                        node.remove();
                    }
                }
            });
        });
    });
    
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    
    // Monitor Form Submissions
    document.addEventListener('submit', (e) => {
        const action = e.target.action;
        if (action) {
            const domain = new URL(action, location.href).hostname;
            if (!ALLOWED_DOMAINS.some(d => domain.includes(d))) {
                console.warn('Blocked form submission to:', domain);
                e.preventDefault();
            }
        }
    });
    
    // Monitor Link Clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
            const domain = new URL(link.href).hostname;
            if (domain && domain !== location.hostname && !ALLOWED_DOMAINS.some(d => domain.includes(d))) {
                console.warn('External link:', domain);
            }
        }
    });
    
})();
