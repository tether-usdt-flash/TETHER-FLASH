// محاكاة حماية Cloudflare
(function() {
    'use strict';

    // فحص إذا كان المستخدم قد اجتاز التحقق
    const verified = sessionStorage.getItem('cf_verified');
    const verifyTime = parseInt(sessionStorage.getItem('cf_verify_time') || '0');
    const now = Date.now();

    // إذا مر أكثر من ساعة، أعد التحقق
    if (!verified || now - verifyTime > 3600000) {
        showChallenge();
    }

    function showChallenge() {
        // إخفاء المحتوى
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:Arial;z-index:999999;">
                <div style="text-align:center;max-width:500px;padding:2rem;">
                    <div style="width:80px;height:80px;margin:0 auto 2rem;border:8px solid #f3f3f3;border-top:8px solid #26a17b;border-radius:50%;animation:spin 1s linear infinite;"></div>
                    <h2 style="color:#333;margin-bottom:1rem;">Checking your browser...</h2>
                    <p style="color:#666;font-size:0.9rem;">This process is automatic. Your browser will redirect to your requested content shortly.</p>
                    <p style="color:#999;font-size:0.8rem;margin-top:2rem;">Please allow up to 5 seconds...</p>
                    <div style="margin-top:2rem;padding:1rem;background:#f9f9f9;border-radius:8px;">
                        <p style="color:#666;font-size:0.8rem;margin:0;">🛡️ DDoS protection by USDT-FLASH Security</p>
                    </div>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        // التحقق من المستخدم
        setTimeout(() => {
            // فحص بسيط للبوتات
            const isBot = /bot|crawler|spider|scraper/i.test(navigator.userAgent) ||
                         navigator.webdriver ||
                         !navigator.languages ||
                         navigator.languages.length === 0;

            if (isBot) {
                document.body.innerHTML = `
                    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;display:flex;justify-content:center;align-items:center;font-family:Arial;">
                        <div style="text-align:center;padding:2rem;">
                            <h1 style="color:#ff0000;font-size:3rem;margin-bottom:1rem;">⛔</h1>
                            <h2 style="color:#333;">Access Denied</h2>
                            <p style="color:#666;margin-top:1rem;">Automated access is not allowed</p>
                        </div>
                    </div>
                `;
                return;
            }

            // حفظ التحقق
            sessionStorage.setItem('cf_verified', 'true');
            sessionStorage.setItem('cf_verify_time', Date.now().toString());

            // استعادة المحتوى
            document.body.innerHTML = originalContent;

            // إعادة تحميل السكريبتات
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.body.appendChild(newScript);
            });

            // تشغيل الأحداث
            window.dispatchEvent(new Event('DOMContentLoaded'));
        }, 3000);
    }

})();
