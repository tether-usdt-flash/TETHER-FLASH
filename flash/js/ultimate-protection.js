// 🔐 Ultimate Protection - Cannot be disabled
(function() {
    'use strict';
    
    // Self-defending code
    const _0x=['security','init','prototype','constructor','console','log','warn','error'];
    
    // Prevent DevTools
    setInterval(() => {
        (function(){}).constructor('debugger')();
    }, 50);
    
    // Detect code tampering
    const originalCode = document.documentElement.innerHTML;
    setInterval(() => {
        if (document.documentElement.innerHTML !== originalCode) {
            location.reload();
        }
    }, 1000);
    
    // Prevent script injection
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT' && !node.src.includes(location.hostname)) {
                    node.remove();
                    location.reload();
                }
            });
        });
    });
    observer.observe(document.documentElement, {childList: true, subtree: true});
    
    // Disable console
    Object.defineProperty(window, 'console', {
        get: () => ({log:()=>{},warn:()=>{},error:()=>{},clear:()=>{}})
    });
    
    // Prevent extension detection
    const _check = () => {
        if (window.outerHeight - window.innerHeight > 200) location.href = 'about:blank';
    };
    setInterval(_check, 1000);
})();
