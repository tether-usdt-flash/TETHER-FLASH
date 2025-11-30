// 🔐 Runtime Code Protection
(function() {
    'use strict';

    const CodeProtector = {
        // Encrypt Sensitive Strings
        _k: 'x9K2mP7nQ4vL8wE',
        
        encrypt(str) {
            return btoa(str.split('').map((c, i) => 
                String.fromCharCode(c.charCodeAt(0) ^ this._k.charCodeAt(i % this._k.length))
            ).join(''));
        },
        
        decrypt(str) {
            return atob(str).split('').map((c, i) => 
                String.fromCharCode(c.charCodeAt(0) ^ this._k.charCodeAt(i % this._k.length))
            ).join('');
        },

        // Protect Function Names
        protectFunctions() {
            const originalFetch = window.fetch;
            window.fetch = function(...args) {
                if (!sessionStorage.getItem('_sk')) {
                    return Promise.reject('Unauthorized');
                }
                return originalFetch.apply(this, args);
            };
        },

        // Anti-Debugging
        antiDebug() {
            setInterval(() => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                if (end - start > 100) {
                    window.location.href = 'about:blank';
                }
            }, 1000);
        },

        // Integrity Verification
        verifyIntegrity() {
            const scripts = Array.from(document.scripts);
            const hashes = scripts.map(s => s.src || s.textContent.substring(0, 100));
            sessionStorage.setItem('_ih', btoa(JSON.stringify(hashes)));
            
            setInterval(() => {
                const current = Array.from(document.scripts)
                    .map(s => s.src || s.textContent.substring(0, 100));
                const stored = JSON.parse(atob(sessionStorage.getItem('_ih') || 'W10='));
                
                if (current.length !== stored.length) {
                    console.warn('Code injection detected');
                    location.reload();
                }
            }, 5000);
        },

        // Initialize Protection
        init() {
            this.protectFunctions();
            this.verifyIntegrity();
            
            // Disable console in production
            if (location.hostname !== 'localhost') {
                console.log = console.warn = console.error = () => {};
            }
        }
    };

    CodeProtector.init();
    window._cp = CodeProtector;
})();
