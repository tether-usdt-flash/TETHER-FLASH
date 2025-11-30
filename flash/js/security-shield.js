// 🛡️ Advanced Security Shield System
(function() {
    'use strict';

    const SecurityShield = {
        // Anti-Bot Protection
        initBotProtection() {
            const checks = [
                () => navigator.webdriver === undefined,
                () => !window.callPhantom && !window._phantom,
                () => !window.Buffer,
                () => !/HeadlessChrome/.test(navigator.userAgent)
            ];
            return checks.every(check => check());
        },

        // Rate Limiting
        rateLimiter: {
            requests: new Map(),
            limit: 50,
            window: 60000,
            
            check(key) {
                const now = Date.now();
                const userRequests = this.requests.get(key) || [];
                const recent = userRequests.filter(time => now - time < this.window);
                
                if (recent.length >= this.limit) return false;
                
                recent.push(now);
                this.requests.set(key, recent);
                return true;
            }
        },

        // Content Protection
        disableDevTools() {
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('keydown', e => {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) ||
                    (e.ctrlKey && e.key === 'U')) {
                    e.preventDefault();
                }
            });
        },

        // XSS Protection
        sanitizeInput(input) {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        },

        // CSRF Token
        generateToken() {
            return Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map(b => b.toString(16).padStart(2, '0')).join('');
        },

        // Obfuscate Sensitive Data
        obfuscate(data) {
            return btoa(encodeURIComponent(data));
        },

        deobfuscate(data) {
            return decodeURIComponent(atob(data));
        },

        // Initialize All Protection
        init() {
            if (!this.initBotProtection()) {
                window.location.href = 'about:blank';
                return;
            }
            
            this.disableDevTools();
            
            // Session Protection
            const sessionKey = this.generateToken();
            sessionStorage.setItem('_sk', sessionKey);
            
            // Integrity Check
            setInterval(() => {
                if (!sessionStorage.getItem('_sk')) {
                    location.reload();
                }
            }, 5000);
        }
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SecurityShield.init());
    } else {
        SecurityShield.init();
    }

    window.SecurityShield = SecurityShield;
})();
