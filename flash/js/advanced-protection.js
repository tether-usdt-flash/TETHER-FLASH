// 🔐 Advanced Multi-Layer Protection System
(function() {
    'use strict';
    
    const CONFIG = {
        domain: 'tether-usdt-flash.github.io',
        path: '/TETHER-FLASH/flash/',
        maxRequests: 30,
        timeWindow: 60000
    };
    
    // Layer 1: Domain Lock
    const domainLock = () => {
        if (location.hostname !== CONFIG.domain || !location.pathname.startsWith(CONFIG.path)) {
            document.body.innerHTML = '';
            throw new Error('Access Denied');
        }
    };
    
    // Layer 2: Anti-Debugger
    const antiDebug = () => {
        const check = () => {
            const start = performance.now();
            debugger;
            if (performance.now() - start > 100) location.href = 'about:blank';
        };
        setInterval(check, 1000);
    };
    
    // Layer 3: Code Integrity
    let codeHash = btoa(document.documentElement.outerHTML.substring(0, 1000));
    const integrityCheck = () => {
        const current = btoa(document.documentElement.outerHTML.substring(0, 1000));
        if (current !== codeHash) location.reload();
    };
    setInterval(integrityCheck, 3000);
    
    // Layer 4: Advanced Rate Limiting
    const rateLimiter = {
        requests: [],
        check() {
            const now = Date.now();
            this.requests = this.requests.filter(t => now - t < CONFIG.timeWindow);
            if (this.requests.length >= CONFIG.maxRequests) {
                document.body.innerHTML = '<h1>Too Many Requests</h1>';
                return false;
            }
            this.requests.push(now);
            return true;
        }
    };
    
    // Layer 5: Prevent Extensions
    const detectExtensions = () => {
        const img = new Image();
        img.onerror = () => location.href = 'about:blank';
        img.src = 'chrome-extension://invalid';
    };
    
    // Layer 6: Mouse Tracking (Human Detection)
    let mouseMovements = 0;
    let lastActivity = Date.now();
    document.addEventListener('mousemove', () => {
        mouseMovements++;
        lastActivity = Date.now();
    });
    
    setInterval(() => {
        if (Date.now() - lastActivity > 300000 && mouseMovements < 10) {
            console.warn('Suspicious activity detected');
        }
    }, 60000);
    
    // Layer 7: Disable All Console
    const disableConsole = () => {
        const noop = () => {};
        ['log','warn','error','info','debug','trace','dir','dirxml','group','groupEnd','time','timeEnd','assert','profile'].forEach(method => {
            console[method] = noop;
        });
    };
    
    // Layer 8: Prevent Copy/Paste
    ['copy','cut','paste','contextmenu','selectstart'].forEach(event => {
        document.addEventListener(event, e => e.preventDefault());
    });
    
    // Layer 9: Keyboard Protection
    document.addEventListener('keydown', e => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(e.key)) ||
            (e.ctrlKey && ['U','S','P'].includes(e.key)) ||
            (e.metaKey && e.altKey && ['I','J','C'].includes(e.key))) {
            e.preventDefault();
            return false;
        }
    });
    
    // Layer 10: Iframe Protection
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
    
    // Layer 11: Screen Recording Detection
    const detectRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia = () => Promise.reject('Not allowed');
        }
    };
    
    // Layer 12: Watermark Injection
    const addWatermark = () => {
        const wm = document.createElement('div');
        wm.textContent = `${CONFIG.domain}-${Date.now()}-${Math.random().toString(36)}`;
        wm.style.cssText = 'position:fixed;opacity:0.001;font-size:1px;pointer-events:none;z-index:999999;bottom:0;right:0';
        document.body.appendChild(wm);
    };
    
    // Initialize All Layers
    const init = () => {
        domainLock();
        antiDebug();
        disableConsole();
        detectExtensions();
        detectRecording();
        addWatermark();
        
        if (!rateLimiter.check()) return;
        
        // Self-protection
        Object.freeze(CONFIG);
        Object.freeze(rateLimiter);
    };
    
    // Execute
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Continuous monitoring
    setInterval(() => {
        domainLock();
        if (!rateLimiter.check()) location.reload();
    }, 5000);
    
})();
