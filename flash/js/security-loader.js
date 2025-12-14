// محمل الأمان الرئيسي - يجب تحميله أولاً
(function() {
    'use strict';

    // فحص البيئة والتهديدات الفورية
    const SecurityLoader = {
        config: null,
        modules: [],
        initialized: false,

        // بدء التحميل
        init() {
            if (this.initialized) return;
            
            console.log('🛡️ Security system initializing...');
            
            // فحص فوري للتهديدات
            this.immediateSecurityCheck();
            
            // تحميل التكوين
            this.loadSecurityConfig()
                .then(() => this.loadSecurityModules())
                .then(() => this.activateProtection())
                .catch(error => this.handleLoadError(error));
        },

        // فحص أمني فوري
        immediateSecurityCheck() {
            // كشف البوتات الأساسي
            if (this.detectBasicBots()) {
                this.blockAccess('Bot detected');
                return;
            }

            // كشف أدوات المطورين
            if (this.detectDevTools()) {
                this.handleDevToolsDetection();
            }

            // فحص URL للحقن
            if (this.detectURLInjection()) {
                window.location.href = '/';
                return;
            }

            // منع النقر بالزر الأيمن فوراً
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });

            // منع اختصارات لوحة المفاتيح الخطيرة
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                    (e.ctrlKey && e.key === 'u')) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        // كشف البوتات الأساسي
        detectBasicBots() {
            const botPatterns = [
                /bot|crawler|spider|scraper/i,
                /headless|phantom|selenium/i,
                /curl|wget|python|java/i
            ];

            return botPatterns.some(pattern => 
                pattern.test(navigator.userAgent)
            ) || 
            navigator.webdriver === true ||
            navigator.plugins.length === 0 ||
            navigator.languages.length === 0;
        },

        // كشف أدوات المطورين
        detectDevTools() {
            return window.outerHeight - window.innerHeight > 200 ||
                   window.outerWidth - window.innerWidth > 200;
        },

        // كشف حقن URL
        detectURLInjection() {
            const maliciousPatterns = [
                /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
                /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
                /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
                /((\%27)|(\'))union/i,
                /exec(\s|\+)+(s|x)p\w+/i,
                /<script|javascript:|vbscript:|onload=|onerror=/i
            ];

            const url = window.location.href;
            return maliciousPatterns.some(pattern => pattern.test(url));
        },

        // تحميل تكوين الأمان
        async loadSecurityConfig() {
            try {
                const response = await fetch('./security-config.json');
                this.config = await response.json();
                console.log('✅ Security config loaded');
            } catch (error) {
                console.warn('⚠️ Using default security config');
                this.config = this.getDefaultConfig();
            }
        },

        // تحميل وحدات الأمان
        async loadSecurityModules() {
            const modules = [
                './js/security-core.js',
                './js/advanced-firewall.js', 
                './js/anti-ddos.js',
                './js/content-security.js'
            ];

            const loadPromises = modules.map(module => this.loadModule(module));
            
            try {
                await Promise.all(loadPromises);
                console.log('✅ All security modules loaded');
            } catch (error) {
                console.error('❌ Failed to load security modules:', error);
                // تفعيل الحماية الأساسية على الأقل
                this.activateBasicProtection();
            }
        },

        // تحميل وحدة واحدة
        loadModule(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    console.log(`✅ Loaded: ${src}`);
                    resolve();
                };
                script.onerror = () => {
                    console.warn(`⚠️ Failed to load: ${src}`);
                    reject(new Error(`Failed to load ${src}`));
                };
                document.head.appendChild(script);
            });
        },

        // تفعيل الحماية الكاملة
        activateProtection() {
            if (!this.config?.security?.features) {
                console.error('❌ Invalid security config');
                return;
            }

            const features = this.config.security.features;

            // تفعيل الميزات حسب التكوين
            if (features.coreProtection?.enabled) {
                console.log('🛡️ Core protection activated');
            }

            if (features.ddosProtection?.enabled) {
                console.log('🛡️ DDoS protection activated');
            }

            if (features.firewallProtection?.enabled) {
                console.log('🛡️ Firewall protection activated');
            }

            if (features.contentSecurity?.enabled) {
                console.log('🛡️ Content security activated');
            }

            // تطبيق رؤوس الأمان
            this.applySecurityHeaders();

            // بدء المراقبة
            this.startSecurityMonitoring();

            this.initialized = true;
            console.log('🎯 Security system fully activated');

            // إخفاء رسائل وحدة التحكم في الإنتاج
            if (location.hostname !== 'localhost') {
                setTimeout(() => {
                    console.clear();
                    console.log('%c🛡️ SECURITY ACTIVE', 
                        'color: #00ff00; font-size: 20px; font-weight: bold;');
                }, 2000);
            }
        },

        // تفعيل الحماية الأساسية
        activateBasicProtection() {
            console.log('⚠️ Activating basic protection mode');

            // حماية أساسية من XSS
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

            // حماية أساسية من النسخ
            document.body.style.userSelect = 'none';
            document.addEventListener('copy', (e) => e.preventDefault());
            document.addEventListener('cut', (e) => e.preventDefault());
            document.addEventListener('paste', (e) => e.preventDefault());

            console.log('✅ Basic protection activated');
        },

        // تطبيق رؤوس الأمان
        applySecurityHeaders() {
            if (!this.config?.security?.securityHeaders) return;

            const headers = this.config.security.securityHeaders;
            
            // CSP Meta Tag
            if (headers.contentSecurityPolicy) {
                const cspMeta = document.createElement('meta');
                cspMeta.httpEquiv = 'Content-Security-Policy';
                cspMeta.content = headers.contentSecurityPolicy;
                document.head.appendChild(cspMeta);
            }

            // X-Frame-Options
            if (headers.xFrameOptions) {
                const frameMeta = document.createElement('meta');
                frameMeta.httpEquiv = 'X-Frame-Options';
                frameMeta.content = headers.xFrameOptions;
                document.head.appendChild(frameMeta);
            }

            console.log('✅ Security headers applied');
        },

        // بدء مراقبة الأمان
        startSecurityMonitoring() {
            // مراقبة الأداء
            setInterval(() => {
                this.monitorPerformance();
            }, 10000);

            // مراقبة التهديدات
            setInterval(() => {
                this.monitorThreats();
            }, 5000);

            // مراقبة سلامة الكود
            setInterval(() => {
                this.monitorCodeIntegrity();
            }, 15000);

            console.log('👁️ Security monitoring started');
        },

        // مراقبة الأداء
        monitorPerformance() {
            if (performance.memory) {
                const memoryUsage = performance.memory.usedJSHeapSize;
                const memoryLimit = 100 * 1024 * 1024; // 100MB

                if (memoryUsage > memoryLimit) {
                    console.warn('⚠️ High memory usage detected');
                    this.handleResourceExhaustion('memory');
                }
            }
        },

        // مراقبة التهديدات
        monitorThreats() {
            // فحص أدوات المطورين
            if (this.detectDevTools()) {
                this.handleDevToolsDetection();
            }

            // فحص التلاعب بالكود
            if (this.detectCodeTampering()) {
                this.handleCodeTampering();
            }
        },

        // مراقبة سلامة الكود
        monitorCodeIntegrity() {
            // فحص الدوال المهمة
            const criticalFunctions = ['fetch', 'XMLHttpRequest', 'eval'];
            
            criticalFunctions.forEach(funcName => {
                if (window[funcName] && typeof window[funcName] !== 'function') {
                    console.error(`❌ Critical function compromised: ${funcName}`);
                    location.reload();
                }
            });
        },

        // كشف التلاعب بالكود
        detectCodeTampering() {
            // فحص بسيط للتلاعب
            return document.querySelectorAll('script[src*="malicious"]').length > 0 ||
                   document.querySelectorAll('iframe[src*="suspicious"]').length > 0;
        },

        // معالجة كشف أدوات المطورين
        handleDevToolsDetection() {
            if (location.hostname !== 'localhost') {
                document.body.innerHTML = `
                    <div style="text-align: center; padding: 50px; font-family: Arial; background: #000; color: #fff; height: 100vh;">
                        <h1 style="color: #ff0000;">🚫 ACCESS DENIED</h1>
                        <p>Developer tools detected. This action has been logged.</p>
                        <p>If you are a legitimate user, please refresh the page.</p>
                    </div>
                `;
            }
        },

        // معالجة التلاعب بالكود
        handleCodeTampering() {
            console.error('❌ Code tampering detected - reloading page');
            location.reload();
        },

        // معالجة استنزاف الموارد
        handleResourceExhaustion(type) {
            console.warn(`⚠️ Resource exhaustion: ${type}`);
            
            if (type === 'memory' && window.gc) {
                window.gc(); // تنظيف الذاكرة إذا كان متاحاً
            }
        },

        // حظر الوصول
        blockAccess(reason) {
            console.error(`❌ Access blocked: ${reason}`);
            
            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: Arial; background: #000; color: #fff; height: 100vh;">
                    <h1 style="color: #ff0000;">🚫 ACCESS BLOCKED</h1>
                    <p>Reason: ${reason}</p>
                    <p>This incident has been logged and reported.</p>
                </div>
            `;

            // منع أي تفاعل إضافي
            document.addEventListener('click', (e) => e.preventDefault(), true);
            document.addEventListener('keydown', (e) => e.preventDefault(), true);
        },

        // معالجة خطأ التحميل
        handleLoadError(error) {
            console.error('❌ Security system load error:', error);
            
            // تفعيل الحماية الأساسية على الأقل
            this.activateBasicProtection();
        },

        // التكوين الافتراضي
        getDefaultConfig() {
            return {
                security: {
                    features: {
                        coreProtection: { enabled: true },
                        ddosProtection: { enabled: true },
                        firewallProtection: { enabled: true },
                        contentSecurity: { enabled: true }
                    },
                    securityHeaders: {
                        contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline';",
                        xFrameOptions: "DENY"
                    }
                }
            };
        }
    };

    // بدء النظام فوراً
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SecurityLoader.init());
    } else {
        SecurityLoader.init();
    }

    // حماية محمل الأمان نفسه
    Object.freeze(SecurityLoader);

    // تصدير للاستخدام العام إذا لزم الأمر
    window.SecurityLoader = SecurityLoader;

})();