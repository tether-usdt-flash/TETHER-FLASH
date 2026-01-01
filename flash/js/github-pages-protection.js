// 🔒 GitHub Pages Domain Protection
(function() {
    'use strict';
    
    const ALLOWED_DOMAIN = 'tether-usdt-flash.github.io';
    const ALLOWED_PATH = '/TETHER-FLASH/flash/';
    
    // Check if running on correct domain
    if (location.hostname !== ALLOWED_DOMAIN || !location.pathname.startsWith(ALLOWED_PATH)) {
        document.body.innerHTML = '<h1 style="text-align:center;margin-top:50px;">⚠️ Unauthorized Access</h1>';
        throw new Error('Domain verification failed');
    }
    
    // Prevent iframe embedding
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
    
    // Add domain watermark
    const watermark = document.createElement('div');
    watermark.textContent = `Protected: ${ALLOWED_DOMAIN}`;
    watermark.style.cssText = 'position:fixed;bottom:0;right:0;opacity:0.01;font-size:1px;pointer-events:none;z-index:999999';
    document.body.appendChild(watermark);
    
    // Monitor domain changes
    setInterval(() => {
        if (location.hostname !== ALLOWED_DOMAIN) {
            location.href = `https://${ALLOWED_DOMAIN}${ALLOWED_PATH}index.html`;
        }
    }, 2000);
})();
