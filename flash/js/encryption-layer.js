// 🔒 Encryption & Obfuscation Layer
(function(_0x4d8f) {
    'use strict';
    
    // Dynamic Key Generation
    const _k = btoa(location.hostname + Date.now()).substring(0, 16);
    
    // XOR Encryption
    const _e = (str) => {
        return btoa(str.split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) ^ _k.charCodeAt(i % _k.length))
        ).join(''));
    };
    
    const _d = (str) => {
        return atob(str).split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) ^ _k.charCodeAt(i % _k.length))
        ).join('');
    };
    
    // Protect Critical Functions
    const _protect = () => {
        const critical = ['fetch', 'XMLHttpRequest', 'WebSocket'];
        critical.forEach(fn => {
            if (window[fn]) {
                const original = window[fn];
                window[fn] = new Proxy(original, {
                    construct(target, args) {
                        if (!sessionStorage.getItem('_auth')) {
                            throw new Error('Unauthorized');
                        }
                        return new target(...args);
                    }
                });
            }
        });
    };
    
    // Anti-Tampering
    const _seal = () => {
        Object.freeze(Object.prototype);
        Object.freeze(Array.prototype);
        Object.freeze(Function.prototype);
    };
    
    // Polymorphic Code
    const _morph = () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(s => {
            s.integrity = btoa(Math.random().toString());
        });
    };
    
    // Initialize
    (() => {
        sessionStorage.setItem('_auth', _e(Date.now().toString()));
        _protect();
        _seal();
        _morph();
        
        // Self-destruct on tampering
        const _check = setInterval(() => {
            if (!sessionStorage.getItem('_auth')) {
                clearInterval(_check);
                document.body.innerHTML = '';
                location.href = 'about:blank';
            }
        }, 2000);
    })();
    
})(window);
