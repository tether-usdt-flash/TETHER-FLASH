// نظام الحماية المتقدم ضد جميع أنواع الهجمات
class SecurityCore {
    constructor() {
        this.init();
        this.startMonitoring();
    }

    init() {
        // حماية من DDoS
        this.ddosProtection();
        // حماية من XSS
        this.xssProtection();
        // حماية من CSRF
        this.csrfProtection();
        // حماية من Bot
        this.botProtection();
        // حماية من Injection
        this.injectionProtection();
        // حماية من DevTools
        this.devToolsProtection();
        // حماية من Copy/Paste
        this.copyProtection();
        // حماية من Scraping
        this.scrapingProtection();
    }

    ddosProtection() {
        let requestCount = 0;
        const maxRequests = 50;
        const timeWindow = 60000; // دقيقة واحدة

        setInterval(() => { requestCount = 0; }, timeWindow);

        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            if (++requestCount > maxRequests) {
                throw new Error('Rate limit exceeded');
            }
            return originalFetch.apply(this, args);
        };
    }

    xssProtection() {
        // تنظيف جميع المدخلات
        const sanitize = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        // مراقبة DOM للتغييرات المشبوهة
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                        if (!node.src.includes(location.hostname)) {
                            node.remove();
                        }
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    csrfProtection() {
        // إنشاء CSRF Token
        const token = btoa(Math.random().toString()).substr(10, 15);
        sessionStorage.setItem('csrf_token', token);

        // إضافة Token لجميع الطلبات
        const originalFetch = window.fetch;
        window.fetch = function(url, options = {}) {
            options.headers = options.headers || {};
            options.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
            return originalFetch(url, options);
        };
    }

    botProtection() {
        // كشف البوتات
        const isBot = () => {
            return /bot|crawler|spider|crawling/i.test(navigator.userAgent) ||
                   !navigator.webdriver === undefined ||
                   navigator.plugins.length === 0 ||
                   navigator.languages.length === 0;
        };

        if (isBot()) {
            document.body.innerHTML = '<h1>Access Denied</h1>';
            return;
        }

        // تحدي JavaScript للبوتات
        let challenge = Math.floor(Math.random() * 1000);
        setTimeout(() => {
            if (window.challengeResponse !== challenge * 2) {
                location.href = 'about:blank';
            }
        }, 3000);
        window.challengeResponse = challenge * 2;
    }

    injectionProtection() {
        // حماية من SQL Injection في URL
        const maliciousPatterns = [
            /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
            /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
            /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
            /((\%27)|(\'))union/i,
            /exec(\s|\+)+(s|x)p\w+/i
        ];

        const checkUrl = () => {
            const url = window.location.href;
            maliciousPatterns.forEach(pattern => {
                if (pattern.test(url)) {
                    location.href = '/';
                }
            });
        };

        checkUrl();
        window.addEventListener('popstate', checkUrl);
    }

    devToolsProtection() {
        // كشف فتح DevTools
        let devtools = { open: false, orientation: null };
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || 
                window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    document.body.innerHTML = '<h1>Developer Tools Detected</h1>';
                }
            }
        }, 500);

        // منع F12 و Ctrl+Shift+I
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });

        // منع النقر بالزر الأيمن
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }

    copyProtection() {
        // منع النسخ واللصق
        document.addEventListener('copy', (e) => e.preventDefault());
        document.addEventListener('cut', (e) => e.preventDefault());
        document.addEventListener('paste', (e) => e.preventDefault());
        document.addEventListener('selectstart', (e) => e.preventDefault());
        document.addEventListener('dragstart', (e) => e.preventDefault());

        // منع اختصارات النسخ
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a')) {
                e.preventDefault();
                return false;
            }
        });

        // حماية CSS
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
    }

    scrapingProtection() {
        // كشف السكرابينغ
        let mouseMovements = 0;
        let scrollEvents = 0;
        
        document.addEventListener('mousemove', () => mouseMovements++);
        document.addEventListener('scroll', () => scrollEvents++);

        setInterval(() => {
            if (mouseMovements === 0 && scrollEvents === 0) {
                // سلوك مشبوه - لا توجد تفاعلات بشرية
                location.href = 'about:blank';
            }
            mouseMovements = 0;
            scrollEvents = 0;
        }, 30000);

        // إخفاء المحتوى عن البوتات
        if (navigator.webdriver) {
            document.body.style.display = 'none';
        }
    }

    startMonitoring() {
        // مراقبة الأداء والهجمات
        setInterval(() => {
            this.performanceCheck();
            this.memoryCheck();
            this.networkCheck();
        }, 5000);
    }

    performanceCheck() {
        if (performance.now() > 10000) { // إذا كان الموقع بطيء جداً
            // قد يكون هجوم
            console.warn('Performance issue detected');
        }
    }

    memoryCheck() {
        if (performance.memory && performance.memory.usedJSHeapSize > 50000000) {
            // استهلاك ذاكرة مرتفع - قد يكون هجوم
            location.reload();
        }
    }

    networkCheck() {
        // مراقبة الشبكة للطلبات المشبوهة
        if (navigator.connection && navigator.connection.downlink < 0.5) {
            // اتصال بطيء جداً - قد يكون هجوم
            console.warn('Suspicious network activity');
        }
    }
}

// تشغيل نظام الحماية
document.addEventListener('DOMContentLoaded', () => {
    new SecurityCore();
});

// حماية إضافية للكود
(function() {
    'use strict';
    
    // منع تعديل الكود
    Object.freeze(SecurityCore);
    Object.freeze(SecurityCore.prototype);
    
    // إخفاء الكود في الإنتاج
    if (location.hostname !== 'localhost') {
        console.clear();
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px;');
    }
})();