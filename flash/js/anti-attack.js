// حماية قوية ضد التعطيل والهجمات
(function() {
    'use strict';

    // عداد الطلبات لكل IP
    const requests = new Map();
    const blocked = new Set();
    
    // الحد الأقصى للطلبات
    const MAX_REQUESTS = 20; // 20 طلب
    const TIME_WINDOW = 10000; // في 10 ثوانٍ
    const BLOCK_DURATION = 300000; // حظر لمدة 5 دقائق

    // الحصول على معرف المستخدم
    function getUserId() {
        let id = localStorage.getItem('user_id');
        if (!id) {
            id = Date.now() + '_' + Math.random().toString(36);
            localStorage.setItem('user_id', id);
        }
        return id;
    }

    // فحص وحظر الطلبات الزائدة
    function checkRateLimit() {
        const userId = getUserId();
        const now = Date.now();

        // فحص إذا كان محظور
        if (blocked.has(userId)) {
            const blockTime = blocked.get(userId);
            if (now - blockTime < BLOCK_DURATION) {
                blockUser();
                return false;
            }
            blocked.delete(userId);
        }

        // تحديث عداد الطلبات
        if (!requests.has(userId)) {
            requests.set(userId, []);
        }

        const userRequests = requests.get(userId);
        userRequests.push(now);

        // حذف الطلبات القديمة
        const recentRequests = userRequests.filter(time => now - time < TIME_WINDOW);
        requests.set(userId, recentRequests);

        // فحص إذا تجاوز الحد
        if (recentRequests.length > MAX_REQUESTS) {
            blocked.set(userId, now);
            blockUser();
            return false;
        }

        return true;
    }

    // حظر المستخدم
    function blockUser() {
        document.body.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:Arial;z-index:999999;">
                <h1 style="color:#ff0000;font-size:3rem;margin-bottom:1rem;">⛔ BLOCKED</h1>
                <p style="font-size:1.2rem;">Too many requests detected</p>
                <p style="font-size:1rem;margin-top:1rem;opacity:0.7;">You have been temporarily blocked for 5 minutes</p>
                <p style="font-size:0.9rem;margin-top:2rem;opacity:0.5;">Your activity has been logged</p>
            </div>
        `;
        
        // منع أي تفاعل
        document.addEventListener('click', e => e.preventDefault(), true);
        document.addEventListener('keydown', e => e.preventDefault(), true);
    }

    // مراقبة الطلبات
    setInterval(checkRateLimit, 1000);

    // حماية من إعادة التحميل المتكرر
    let reloadCount = parseInt(sessionStorage.getItem('reload_count') || '0');
    reloadCount++;
    sessionStorage.setItem('reload_count', reloadCount);

    if (reloadCount > 10) {
        blockUser();
        return;
    }

    // إعادة تعيين العداد بعد دقيقة
    setTimeout(() => {
        sessionStorage.setItem('reload_count', '0');
    }, 60000);

    // حماية من الطلبات المتعددة
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        if (!checkRateLimit()) {
            return Promise.reject(new Error('Rate limit exceeded'));
        }
        return originalFetch.apply(this, args);
    };

    // حماية من XMLHttpRequest
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalSend = xhr.send;
        xhr.send = function(...args) {
            if (!checkRateLimit()) {
                throw new Error('Rate limit exceeded');
            }
            return originalSend.apply(this, args);
        };
        return xhr;
    };

    // كشف البوتات
    if (navigator.webdriver || 
        /bot|crawler|spider|scraper/i.test(navigator.userAgent) ||
        navigator.plugins.length === 0) {
        blockUser();
        return;
    }

    // كشف الأتمتة
    let mouseMovements = 0;
    let clicks = 0;
    
    document.addEventListener('mousemove', () => mouseMovements++);
    document.addEventListener('click', () => clicks++);

    setInterval(() => {
        if (clicks > 50 || (clicks > 10 && mouseMovements === 0)) {
            blockUser();
        }
        clicks = 0;
        mouseMovements = 0;
    }, 5000);

    // حماية من console
    const methods = ['log', 'debug', 'info', 'warn', 'error'];
    methods.forEach(method => {
        const original = console[method];
        console[method] = function(...args) {
            if (args[0] && typeof args[0] === 'string' && 
                /attack|hack|exploit|ddos/i.test(args[0])) {
                blockUser();
                return;
            }
            return original.apply(console, args);
        };
    });

    // منع تعديل الكود
    Object.freeze(window.fetch);
    Object.freeze(window.XMLHttpRequest);
    Object.freeze(console);

})();
