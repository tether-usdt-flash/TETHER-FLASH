// 🚫 Anti-Scraping & Clone Protection
(function() {
    'use strict';

    const AntiScraping = {
        // Fingerprint Generation
        async generateFingerprint() {
            const data = [
                navigator.userAgent,
                navigator.language,
                screen.width + 'x' + screen.height,
                new Date().getTimezoneOffset(),
                !!window.sessionStorage,
                !!window.localStorage
            ].join('|');
            
            const buffer = new TextEncoder().encode(data);
            const hash = await crypto.subtle.digest('SHA-256', buffer);
            return Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0')).join('');
        },

        // Honeypot Elements
        createHoneypots() {
            const honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = 'email_confirm';
            honeypot.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none';
            honeypot.tabIndex = -1;
            document.body.appendChild(honeypot);
            
            // Monitor honeypot
            honeypot.addEventListener('input', () => {
                console.warn('Bot detected');
                window.location.href = 'about:blank';
            });
        },

        // Dynamic Content Watermarking
        watermarkContent() {
            const watermark = document.createElement('div');
            watermark.style.cssText = 'position:fixed;bottom:0;right:0;opacity:0.01;font-size:1px;pointer-events:none;z-index:999999';
            watermark.textContent = `Protected-${Date.now()}-${Math.random().toString(36)}`;
            document.body.appendChild(watermark);
        },

        // Detect Automation Tools
        detectAutomation() {
            const checks = {
                webdriver: navigator.webdriver,
                phantom: window.callPhantom || window._phantom,
                selenium: window.document.documentElement.getAttribute('webdriver'),
                headless: /HeadlessChrome/.test(navigator.userAgent)
            };
            
            return Object.values(checks).some(v => v);
        },

        // Mouse Movement Tracking
        trackHumanBehavior() {
            let movements = 0;
            let lastMove = Date.now();
            
            document.addEventListener('mousemove', () => {
                movements++;
                lastMove = Date.now();
            });
            
            setInterval(() => {
                if (Date.now() - lastMove > 30000 && movements < 10) {
                    console.warn('Suspicious behavior detected');
                }
            }, 30000);
        },

        // Initialize Protection
        async init() {
            if (this.detectAutomation()) {
                document.body.innerHTML = '';
                return;
            }
            
            const fp = await this.generateFingerprint();
            sessionStorage.setItem('_fp', fp);
            
            this.createHoneypots();
            this.watermarkContent();
            this.trackHumanBehavior();
            
            // Periodic checks
            setInterval(() => {
                if (this.detectAutomation()) {
                    location.href = 'about:blank';
                }
            }, 10000);
        }
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AntiScraping.init());
    } else {
        AntiScraping.init();
    }
})();
