// جدار حماية متقدم للموقع
class AdvancedFirewall {
    constructor() {
        this.blockedIPs = new Set();
        this.suspiciousActivities = new Map();
        this.rateLimits = new Map();
        this.init();
    }

    init() {
        this.setupIPBlocking();
        this.setupRateLimit();
        this.setupBehaviorAnalysis();
        this.setupGeoBlocking();
        this.setupFingerprinting();
    }

    setupIPBlocking() {
        // قائمة IP المحظورة (يمكن تحديثها من خادم)
        const knownMaliciousIPs = [
            '192.168.1.100', // مثال
            '10.0.0.1'       // مثال
        ];

        // محاكاة الحصول على IP المستخدم
        this.getUserIP().then(ip => {
            if (knownMaliciousIPs.includes(ip) || this.blockedIPs.has(ip)) {
                this.blockAccess('IP blocked');
            }
        });
    }

    async getUserIP() {
        try {
            // محاكاة الحصول على IP (في الإنتاج استخدم خدمة حقيقية)
            return '127.0.0.1';
        } catch (error) {
            return 'unknown';
        }
    }

    setupRateLimit() {
        const limits = {
            requests: { max: 100, window: 60000 }, // 100 طلب في الدقيقة
            clicks: { max: 50, window: 60000 },    // 50 نقرة في الدقيقة
            forms: { max: 10, window: 300000 }     // 10 نماذج في 5 دقائق
        };

        // مراقبة الطلبات
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            if (!this.checkRateLimit('requests')) {
                throw new Error('Rate limit exceeded');
            }
            return originalFetch.apply(window, args);
        };

        // مراقبة النقرات
        document.addEventListener('click', () => {
            if (!this.checkRateLimit('clicks')) {
                this.blockAccess('Too many clicks');
            }
        });

        // مراقبة النماذج
        document.addEventListener('submit', (e) => {
            if (!this.checkRateLimit('forms')) {
                e.preventDefault();
                this.blockAccess('Too many form submissions');
            }
        });
    }

    checkRateLimit(type) {
        const now = Date.now();
        const key = `${type}_${this.getFingerprint()}`;
        
        if (!this.rateLimits.has(key)) {
            this.rateLimits.set(key, { count: 0, resetTime: now + 60000 });
        }

        const limit = this.rateLimits.get(key);
        
        if (now > limit.resetTime) {
            limit.count = 0;
            limit.resetTime = now + 60000;
        }

        limit.count++;
        
        const maxLimits = { requests: 100, clicks: 50, forms: 10 };
        return limit.count <= maxLimits[type];
    }

    setupBehaviorAnalysis() {
        let suspiciousScore = 0;
        const fingerprint = this.getFingerprint();

        // تحليل سرعة التفاعل
        let lastInteraction = Date.now();
        document.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastInteraction < 100) { // نقرات سريعة جداً
                suspiciousScore += 10;
            }
            lastInteraction = now;
            this.checkSuspiciousScore(suspiciousScore, fingerprint);
        });

        // تحليل حركة الماوس
        let mouseMovements = [];
        document.addEventListener('mousemove', (e) => {
            mouseMovements.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (mouseMovements.length > 100) {
                mouseMovements.shift();
            }
            
            // كشف الحركة الآلية
            if (this.isRoboticMovement(mouseMovements)) {
                suspiciousScore += 20;
                this.checkSuspiciousScore(suspiciousScore, fingerprint);
            }
        });

        // تحليل أنماط التصفح
        let pageViews = 0;
        let timeOnPage = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const sessionTime = Date.now() - timeOnPage;
            if (sessionTime < 1000 && pageViews > 5) { // تصفح سريع جداً
                suspiciousScore += 15;
            }
        });
    }

    isRoboticMovement(movements) {
        if (movements.length < 10) return false;
        
        // فحص الحركة المستقيمة المثالية
        let straightLines = 0;
        for (let i = 2; i < movements.length; i++) {
            const dx1 = movements[i-1].x - movements[i-2].x;
            const dy1 = movements[i-1].y - movements[i-2].y;
            const dx2 = movements[i].x - movements[i-1].x;
            const dy2 = movements[i].y - movements[i-1].y;
            
            if (Math.abs(dx1 - dx2) < 1 && Math.abs(dy1 - dy2) < 1) {
                straightLines++;
            }
        }
        
        return straightLines > movements.length * 0.8; // 80% حركة مستقيمة
    }

    setupGeoBlocking() {
        // حظر دول معينة (اختياري)
        const blockedCountries = ['XX', 'YY']; // رموز الدول
        
        // محاكاة الحصول على الموقع الجغرافي
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // في الإنتاج، استخدم خدمة لتحويل الإحداثيات إلى دولة
                    // this.checkCountryAccess(country);
                },
                () => {
                    // فشل في الحصول على الموقع - مشبوه
                    this.addSuspiciousActivity('geo_failure');
                }
            );
        }
    }

    setupFingerprinting() {
        // إنشاء بصمة فريدة للمستخدم
        const fingerprint = this.getFingerprint();
        
        // تتبع البصمات المشبوهة
        const storedFingerprints = JSON.parse(localStorage.getItem('fingerprints') || '[]');
        if (storedFingerprints.includes(fingerprint)) {
            this.addSuspiciousActivity('duplicate_fingerprint');
        } else {
            storedFingerprints.push(fingerprint);
            localStorage.setItem('fingerprints', JSON.stringify(storedFingerprints.slice(-100)));
        }
    }

    getFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Fingerprint test', 2, 2);
        
        return btoa(JSON.stringify({
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvas: canvas.toDataURL(),
            plugins: Array.from(navigator.plugins).map(p => p.name).join(','),
            webgl: this.getWebGLFingerprint()
        }));
    }

    getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'no-webgl';
            
            return gl.getParameter(gl.RENDERER) + '|' + gl.getParameter(gl.VENDOR);
        } catch (e) {
            return 'webgl-error';
        }
    }

    addSuspiciousActivity(type) {
        const fingerprint = this.getFingerprint();
        const key = `${fingerprint}_${type}`;
        const count = this.suspiciousActivities.get(key) || 0;
        this.suspiciousActivities.set(key, count + 1);
        
        if (count > 3) { // أكثر من 3 أنشطة مشبوهة
            this.blockAccess(`Suspicious activity: ${type}`);
        }
    }

    checkSuspiciousScore(score, fingerprint) {
        if (score > 50) {
            this.blockedIPs.add(fingerprint);
            this.blockAccess('Suspicious behavior detected');
        }
    }

    blockAccess(reason) {
        console.warn(`Access blocked: ${reason}`);
        
        // إعادة توجيه أو إظهار رسالة
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial;">
                <h1 style="color: red;">Access Denied</h1>
                <p>Your access has been blocked due to suspicious activity.</p>
                <p>Reason: ${reason}</p>
                <p>If you believe this is an error, please contact support.</p>
            </div>
        `;
        
        // منع أي تفاعل إضافي
        document.addEventListener('click', (e) => e.preventDefault(), true);
        document.addEventListener('keydown', (e) => e.preventDefault(), true);
        
        // إرسال تقرير (في الإنتاج)
        this.reportIncident(reason);
    }

    reportIncident(reason) {
        // إرسال تقرير إلى الخادم (محاكاة)
        const report = {
            timestamp: new Date().toISOString(),
            reason: reason,
            fingerprint: this.getFingerprint(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log('Security incident reported:', report);
        
        // في الإنتاج، أرسل إلى خادم المراقبة
        // fetch('/api/security/report', {
        //     method: 'POST',
        //     body: JSON.stringify(report)
        // });
    }
}

// تشغيل جدار الحماية
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedFirewall();
});

// حماية الكود من التعديل
Object.freeze(AdvancedFirewall);
Object.freeze(AdvancedFirewall.prototype);
