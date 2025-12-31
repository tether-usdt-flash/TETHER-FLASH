// نظام حماية متقدم ضد هجمات DDoS
class AntiDDoS {
    constructor() {
        this.requestQueue = [];
        this.connectionPool = new Map();
        this.trafficAnalyzer = new TrafficAnalyzer();
        this.emergencyMode = false;
        this.init();
    }

    init() {
        this.setupRequestThrottling();
        this.setupConnectionLimiting();
        this.setupTrafficAnalysis();
        this.setupEmergencyProtection();
        this.setupResourceProtection();
    }

    setupRequestThrottling() {
        const throttleConfig = {
            maxRequestsPerSecond: 10,
            maxRequestsPerMinute: 100,
            maxConcurrentRequests: 5,
            cooldownPeriod: 30000 // 30 ثانية
        };

        let requestCounts = {
            perSecond: 0,
            perMinute: 0,
            concurrent: 0
        };

        // إعادة تعيين العدادات
        setInterval(() => { requestCounts.perSecond = 0; }, 1000);
        setInterval(() => { requestCounts.perMinute = 0; }, 60000);

        // اعتراض جميع الطلبات
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const clientId = this.getClientId();
            
            // فحص الحدود
            if (requestCounts.perSecond >= throttleConfig.maxRequestsPerSecond) {
                throw new Error('Rate limit exceeded - too many requests per second');
            }
            
            if (requestCounts.perMinute >= throttleConfig.maxRequestsPerMinute) {
                throw new Error('Rate limit exceeded - too many requests per minute');
            }
            
            if (requestCounts.concurrent >= throttleConfig.maxConcurrentRequests) {
                throw new Error('Too many concurrent requests');
            }

            // تحديث العدادات
            requestCounts.perSecond++;
            requestCounts.perMinute++;
            requestCounts.concurrent++;

            try {
                const result = await originalFetch.apply(window, args);
                requestCounts.concurrent--;
                return result;
            } catch (error) {
                requestCounts.concurrent--;
                throw error;
            }
        };

        // اعتراض XMLHttpRequest
        const originalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new originalXHR();
            const originalSend = xhr.send;
            
            xhr.send = function(...args) {
                if (requestCounts.perSecond >= throttleConfig.maxRequestsPerSecond) {
                    throw new Error('Rate limit exceeded');
                }
                requestCounts.perSecond++;
                requestCounts.perMinute++;
                return originalSend.apply(this, args);
            };
            
            return xhr;
        };
    }

    setupConnectionLimiting() {
        const maxConnectionsPerIP = 10;
        const connectionTimeout = 30000; // 30 ثانية

        // مراقبة الاتصالات
        const trackConnection = (type) => {
            const clientId = this.getClientId();
            const now = Date.now();
            
            if (!this.connectionPool.has(clientId)) {
                this.connectionPool.set(clientId, {
                    connections: [],
                    lastActivity: now,
                    suspiciousActivity: 0
                });
            }

            const client = this.connectionPool.get(clientId);
            
            // تنظيف الاتصالات القديمة
            client.connections = client.connections.filter(
                conn => now - conn.timestamp < connectionTimeout
            );

            // فحص الحد الأقصى للاتصالات
            if (client.connections.length >= maxConnectionsPerIP) {
                this.handleSuspiciousActivity(clientId, 'too_many_connections');
                throw new Error('Connection limit exceeded');
            }

            // إضافة الاتصال الجديد
            client.connections.push({
                type: type,
                timestamp: now,
                url: window.location.href
            });

            client.lastActivity = now;
        };

        // مراقبة أحداث الشبكة
        document.addEventListener('DOMContentLoaded', () => trackConnection('page_load'));
        window.addEventListener('beforeunload', () => trackConnection('page_unload'));
        
        // مراقبة الطلبات AJAX
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            trackConnection('fetch');
            return originalFetch.apply(this, args);
        };
    }

    setupTrafficAnalysis() {
        this.trafficAnalyzer.startMonitoring();
        
        // فحص دوري للترافيك المشبوه
        setInterval(() => {
            const analysis = this.trafficAnalyzer.analyze();
            
            if (analysis.isDDoSAttack) {
                this.activateEmergencyMode(analysis.reason);
            }
            
            if (analysis.suspiciousPatterns.length > 0) {
                this.handleSuspiciousPatterns(analysis.suspiciousPatterns);
            }
        }, 5000);
    }

    setupEmergencyProtection() {
        // وضع الطوارئ عند اكتشاف هجوم
        this.emergencyProtocols = {
            // تقليل معدل الطلبات بشدة
            strictRateLimit: () => {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            originalFetch.apply(window, args).then(resolve).catch(reject);
                        }, 2000); // تأخير 2 ثانية لكل طلب
                    });
                };
            },

            // تفعيل CAPTCHA للمستخدمين الجدد
            enableCaptcha: () => {
                if (!sessionStorage.getItem('captcha_verified')) {
                    this.showCaptchaChallenge();
                }
            },

            // حظر مؤقت للـ IPs المشبوهة
            temporaryIPBlock: (duration = 300000) => { // 5 دقائق
                const suspiciousIPs = this.getSuspiciousIPs();
                suspiciousIPs.forEach(ip => {
                    this.blockIP(ip, duration);
                });
            },

            // تقليل استهلاك الموارد
            resourceConservation: () => {
                // إيقاف الرسوم المتحركة
                document.querySelectorAll('*').forEach(el => {
                    el.style.animation = 'none';
                    el.style.transition = 'none';
                });
                
                // تقليل جودة الصور
                document.querySelectorAll('img').forEach(img => {
                    if (img.src && !img.dataset.lowQuality) {
                        img.dataset.originalSrc = img.src;
                        img.src = img.src.replace(/\.(jpg|jpeg|png)/, '_low.$1');
                        img.dataset.lowQuality = 'true';
                    }
                });
            }
        };
    }

    setupResourceProtection() {
        // حماية الموارد من الاستنزاف
        const resourceLimits = {
            maxMemoryUsage: 100 * 1024 * 1024, // 100MB
            maxCPUUsage: 80, // 80%
            maxBandwidth: 10 * 1024 * 1024 // 10MB/s
        };

        // مراقبة استهلاك الذاكرة
        if (performance.memory) {
            setInterval(() => {
                const memoryUsage = performance.memory.usedJSHeapSize;
                if (memoryUsage > resourceLimits.maxMemoryUsage) {
                    this.handleResourceExhaustion('memory');
                }
            }, 10000);
        }

        // مراقبة استهلاك المعالج
        let lastCPUCheck = performance.now();
        setInterval(() => {
            const now = performance.now();
            const cpuTime = now - lastCPUCheck;
            
            if (cpuTime > 100) { // إذا استغرق أكثر من 100ms
                this.handleResourceExhaustion('cpu');
            }
            
            lastCPUCheck = now;
        }, 1000);

        // مراقبة استهلاك النطاق الترددي
        let bytesTransferred = 0;
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
            const response = await originalFetch.apply(this, args);
            const contentLength = response.headers.get('content-length');
            if (contentLength) {
                bytesTransferred += parseInt(contentLength);
            }
            return response;
        };

        setInterval(() => {
            if (bytesTransferred > resourceLimits.maxBandwidth) {
                this.handleResourceExhaustion('bandwidth');
            }
            bytesTransferred = 0;
        }, 1000);
    }

    activateEmergencyMode(reason) {
        if (this.emergencyMode) return;
        
        console.warn(`Emergency mode activated: ${reason}`);
        this.emergencyMode = true;

        // تفعيل جميع بروتوكولات الطوارئ
        this.emergencyProtocols.strictRateLimit();
        this.emergencyProtocols.enableCaptcha();
        this.emergencyProtocols.temporaryIPBlock();
        this.emergencyProtocols.resourceConservation();

        // إظهار رسالة للمستخدمين
        this.showEmergencyNotice();

        // إلغاء تفعيل وضع الطوارئ بعد 10 دقائق
        setTimeout(() => {
            this.deactivateEmergencyMode();
        }, 600000);
    }

    deactivateEmergencyMode() {
        this.emergencyMode = false;
        console.log('Emergency mode deactivated');
        
        // إعادة تحميل الصفحة لاستعادة الوضع الطبيعي
        location.reload();
    }

    showCaptchaChallenge() {
        const captchaOverlay = document.createElement('div');
        captchaOverlay.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
                        align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h3>Security Verification</h3>
                    <p>Please solve this challenge to continue:</p>
                    <div id="captcha-challenge">${Math.floor(Math.random() * 10)} + ${Math.floor(Math.random() * 10)} = ?</div>
                    <input type="number" id="captcha-answer" placeholder="Enter answer">
                    <button onclick="this.verifyCaptcha()">Verify</button>
                </div>
            </div>
        `;
        document.body.appendChild(captchaOverlay);
    }

    showEmergencyNotice() {
        const notice = document.createElement('div');
        notice.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; background: #ff4444; 
                        color: white; text-align: center; padding: 10px; z-index: 9999;">
                ⚠️ Security measures are currently active due to suspicious activity. 
                Some features may be temporarily limited.
            </div>
        `;
        document.body.appendChild(notice);
    }

    getClientId() {
        // إنشاء معرف فريد للعميل
        let clientId = sessionStorage.getItem('client_id');
        if (!clientId) {
            clientId = 'client_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('client_id', clientId);
        }
        return clientId;
    }

    handleSuspiciousActivity(clientId, type) {
        const client = this.connectionPool.get(clientId);
        if (client) {
            client.suspiciousActivity++;
            
            if (client.suspiciousActivity > 5) {
                this.blockIP(clientId, 300000); // حظر لمدة 5 دقائق
            }
        }
    }

    handleResourceExhaustion(type) {
        console.warn(`Resource exhaustion detected: ${type}`);
        
        switch (type) {
            case 'memory':
                // تنظيف الذاكرة
                if (window.gc) window.gc();
                break;
            case 'cpu':
                // تقليل العمليات
                this.emergencyProtocols.resourceConservation();
                break;
            case 'bandwidth':
                // تقليل استهلاك النطاق الترددي
                this.emergencyProtocols.strictRateLimit();
                break;
        }
    }

    blockIP(ip, duration) {
        console.warn(`IP blocked: ${ip} for ${duration}ms`);
        // في التطبيق الحقيقي، يتم إرسال هذا إلى الخادم
    }

    getSuspiciousIPs() {
        // إرجاع قائمة بالـ IPs المشبوهة
        return Array.from(this.connectionPool.entries())
            .filter(([id, client]) => client.suspiciousActivity > 3)
            .map(([id]) => id);
    }
}

// فئة تحليل الترافيك
class TrafficAnalyzer {
    constructor() {
        this.trafficData = [];
        this.patterns = new Map();
    }

    startMonitoring() {
        // مراقبة الطلبات
        setInterval(() => {
            this.recordTrafficData();
        }, 1000);
    }

    recordTrafficData() {
        const now = Date.now();
        const data = {
            timestamp: now,
            requests: this.getCurrentRequestCount(),
            connections: this.getCurrentConnectionCount(),
            bandwidth: this.getCurrentBandwidth()
        };
        
        this.trafficData.push(data);
        
        // الاحتفاظ بآخر 300 نقطة بيانات (5 دقائق)
        if (this.trafficData.length > 300) {
            this.trafficData.shift();
        }
    }

    analyze() {
        if (this.trafficData.length < 10) {
            return { isDDoSAttack: false, suspiciousPatterns: [] };
        }

        const recentData = this.trafficData.slice(-60); // آخر دقيقة
        const avgRequests = recentData.reduce((sum, d) => sum + d.requests, 0) / recentData.length;
        const avgConnections = recentData.reduce((sum, d) => sum + d.connections, 0) / recentData.length;

        // كشف أنماط DDoS
        const isDDoSAttack = 
            avgRequests > 100 || // أكثر من 100 طلب في الثانية
            avgConnections > 50 || // أكثر من 50 اتصال متزامن
            this.detectSuddenSpike() ||
            this.detectRepeatingPatterns();

        const suspiciousPatterns = this.identifySuspiciousPatterns();

        return {
            isDDoSAttack,
            suspiciousPatterns,
            reason: isDDoSAttack ? this.getDDoSReason(avgRequests, avgConnections) : null
        };
    }

    detectSuddenSpike() {
        if (this.trafficData.length < 20) return false;
        
        const recent = this.trafficData.slice(-10);
        const previous = this.trafficData.slice(-20, -10);
        
        const recentAvg = recent.reduce((sum, d) => sum + d.requests, 0) / recent.length;
        const previousAvg = previous.reduce((sum, d) => sum + d.requests, 0) / previous.length;
        
        return recentAvg > previousAvg * 5; // زيادة 5 أضعاف
    }

    detectRepeatingPatterns() {
        // كشف الأنماط المتكررة التي تشير إلى هجوم آلي
        const intervals = [];
        for (let i = 1; i < this.trafficData.length; i++) {
            intervals.push(this.trafficData[i].timestamp - this.trafficData[i-1].timestamp);
        }
        
        // فحص الفترات المتساوية (علامة على البوتات)
        const uniqueIntervals = new Set(intervals);
        return uniqueIntervals.size < intervals.length * 0.3; // أقل من 30% تنوع
    }

    identifySuspiciousPatterns() {
        const patterns = [];
        
        // نمط الطلبات المتتالية
        if (this.detectConsecutiveRequests()) {
            patterns.push('consecutive_requests');
        }
        
        // نمط الطلبات من نفس المصدر
        if (this.detectSameSourceRequests()) {
            patterns.push('same_source_flood');
        }
        
        return patterns;
    }

    detectConsecutiveRequests() {
        // كشف الطلبات المتتالية بفترات قصيرة جداً
        return this.trafficData.slice(-10).every((data, i, arr) => {
            if (i === 0) return true;
            return data.timestamp - arr[i-1].timestamp < 100; // أقل من 100ms
        });
    }

    detectSameSourceRequests() {
        // محاكاة كشف الطلبات من نفس المصدر
        return Math.random() < 0.1; // 10% احتمال (للمحاكاة)
    }

    getDDoSReason(avgRequests, avgConnections) {
        if (avgRequests > 100) return 'High request rate';
        if (avgConnections > 50) return 'Too many connections';
        if (this.detectSuddenSpike()) return 'Traffic spike detected';
        if (this.detectRepeatingPatterns()) return 'Automated attack pattern';
        return 'Suspicious traffic pattern';
    }

    getCurrentRequestCount() {
        // محاكاة عدد الطلبات الحالي
        return Math.floor(Math.random() * 20);
    }

    getCurrentConnectionCount() {
        // محاكاة عدد الاتصالات الحالي
        return Math.floor(Math.random() * 10);
    }

    getCurrentBandwidth() {
        // محاكاة استهلاك النطاق الترددي
        return Math.floor(Math.random() * 1000000);
    }
}

// تشغيل نظام الحماية من DDoS
document.addEventListener('DOMContentLoaded', () => {
    new AntiDDoS();
});

// حماية الكود
Object.freeze(AntiDDoS);
Object.freeze(TrafficAnalyzer);
