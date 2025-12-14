// نظام حماية المحتوى والتشفير المتقدم
class ContentSecurity {
    constructor() {
        this.encryptionKey = this.generateEncryptionKey();
        this.integrityHashes = new Map();
        this.secureElements = new Set();
        this.init();
    }

    init() {
        this.setupContentProtection();
        this.setupIntegrityChecking();
        this.setupSecureStorage();
        this.setupAntiTampering();
        this.setupDataEncryption();
    }

    setupContentProtection() {
        // حماية النصوص الحساسة
        this.protectSensitiveContent();
        
        // منع النسخ المتقدم
        this.advancedCopyProtection();
        
        // حماية الصور
        this.protectImages();
        
        // حماية الروابط
        this.protectLinks();
    }

    protectSensitiveContent() {
        // تشفير النصوص الحساسة
        const sensitiveSelectors = [
            '.price', '.amount', '.balance', '.key', '.token',
            '[data-sensitive]', '.sensitive-data'
        ];

        sensitiveSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.dataset.protected) {
                    const originalText = element.textContent;
                    const encryptedText = this.encryptText(originalText);
                    
                    element.dataset.encrypted = encryptedText;
                    element.dataset.protected = 'true';
                    
                    // إظهار النص المشفر للمستخدمين غير المصرح لهم
                    if (!this.isAuthorizedUser()) {
                        element.textContent = '***';
                    }
                    
                    this.secureElements.add(element);
                }
            });
        });
    }

    advancedCopyProtection() {
        // منع النسخ بطرق متقدمة
        const protectionMethods = {
            // منع تحديد النص
            disableSelection: () => {
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
                document.body.style.mozUserSelect = 'none';
                document.body.style.msUserSelect = 'none';
            },

            // منع السحب والإفلات
            disableDragDrop: () => {
                document.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                    return false;
                });
                
                document.addEventListener('drop', (e) => {
                    e.preventDefault();
                    return false;
                });
            },

            // منع الطباعة
            disablePrint: () => {
                window.addEventListener('beforeprint', (e) => {
                    e.preventDefault();
                    alert('Printing is not allowed for security reasons');
                    return false;
                });
                
                // إخفاء المحتوى عند الطباعة
                const style = document.createElement('style');
                style.textContent = '@media print { body { display: none !important; } }';
                document.head.appendChild(style);
            },

            // منع لقطات الشاشة (محدود)
            disableScreenshots: () => {
                // تغيير المحتوى عند فقدان التركيز
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        document.body.style.filter = 'blur(10px)';
                        document.title = 'Security Protected';
                    } else {
                        document.body.style.filter = 'none';
                        document.title = 'USDT Flash';
                    }
                });
            },

            // حماية من أدوات المطورين
            protectFromDevTools: () => {
                // كشف فتح أدوات المطورين
                let devtools = false;
                setInterval(() => {
                    const before = new Date();
                    debugger;
                    const after = new Date();
                    
                    if (after - before > 100) {
                        if (!devtools) {
                            devtools = true;
                            this.handleDevToolsDetection();
                        }
                    } else {
                        devtools = false;
                    }
                }, 1000);
            }
        };

        // تطبيق جميع طرق الحماية
        Object.values(protectionMethods).forEach(method => method());
    }

    protectImages() {
        document.querySelectorAll('img').forEach(img => {
            // منع النقر بالزر الأيمن على الصور
            img.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });

            // منع السحب
            img.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });

            // إضافة علامة مائية غير مرئية
            img.addEventListener('load', () => {
                this.addInvisibleWatermark(img);
            });

            // حماية من الحفظ
            img.style.pointerEvents = 'none';
            
            // تشفير مصدر الصورة
            if (img.src && !img.dataset.encrypted) {
                img.dataset.originalSrc = img.src;
                img.dataset.encrypted = 'true';
            }
        });
    }

    protectLinks() {
        document.querySelectorAll('a').forEach(link => {
            // تشفير الروابط الحساسة
            if (link.href.includes('payment') || link.href.includes('admin')) {
                const encryptedHref = this.encryptText(link.href);
                link.dataset.encryptedHref = encryptedHref;
                
                // استبدال الرابط بمعالج مخصص
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleSecureNavigation(link);
                });
            }
        });
    }

    setupIntegrityChecking() {
        // فحص سلامة المحتوى
        this.calculateContentHashes();
        
        // مراقبة التغييرات
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    this.verifyContentIntegrity(mutation.target);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true
        });
    }

    calculateContentHashes() {
        // حساب hash للعناصر المهمة
        const importantSelectors = [
            '.price', '.amount', 'form', '.payment-info',
            '[data-important]', '.critical-content'
        ];

        importantSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const hash = this.calculateHash(element.outerHTML);
                this.integrityHashes.set(element, hash);
            });
        });
    }

    verifyContentIntegrity(element) {
        if (this.integrityHashes.has(element)) {
            const originalHash = this.integrityHashes.get(element);
            const currentHash = this.calculateHash(element.outerHTML);
            
            if (originalHash !== currentHash) {
                this.handleIntegrityViolation(element);
            }
        }
    }

    setupSecureStorage() {
        // تشفير البيانات في localStorage و sessionStorage
        const originalSetItem = Storage.prototype.setItem;
        const originalGetItem = Storage.prototype.getItem;

        Storage.prototype.setItem = function(key, value) {
            const encryptedValue = this.encryptText(value);
            return originalSetItem.call(this, key, encryptedValue);
        }.bind(this);

        Storage.prototype.getItem = function(key) {
            const encryptedValue = originalGetItem.call(this, key);
            if (encryptedValue) {
                try {
                    return this.decryptText(encryptedValue);
                } catch (e) {
                    return encryptedValue; // إرجاع القيمة الأصلية إذا فشل فك التشفير
                }
            }
            return encryptedValue;
        }.bind(this);
    }

    setupAntiTampering() {
        // حماية من التلاعب بالكود
        const criticalFunctions = [
            'fetch', 'XMLHttpRequest', 'eval', 'Function',
            'setTimeout', 'setInterval'
        ];

        criticalFunctions.forEach(funcName => {
            if (window[funcName]) {
                const originalFunc = window[funcName];
                const funcHash = this.calculateHash(originalFunc.toString());
                
                // مراقبة التغييرات في الدوال المهمة
                setInterval(() => {
                    if (window[funcName] && 
                        this.calculateHash(window[funcName].toString()) !== funcHash) {
                        this.handleTamperingDetection(funcName);
                    }
                }, 5000);
            }
        });

        // حماية من تعديل النماذج
        document.querySelectorAll('form').forEach(form => {
            const originalHTML = form.innerHTML;
            
            setInterval(() => {
                if (form.innerHTML !== originalHTML) {
                    this.handleFormTampering(form);
                }
            }, 2000);
        });
    }

    setupDataEncryption() {
        // تشفير البيانات الحساسة في النماذج
        document.querySelectorAll('input[type="password"], input[data-encrypt]').forEach(input => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value) {
                    // تشفير القيمة في الذاكرة
                    e.target.dataset.encryptedValue = this.encryptText(value);
                }
            });

            // تنظيف القيمة عند إرسال النموذج
            input.form?.addEventListener('submit', () => {
                if (input.dataset.encryptedValue) {
                    input.value = input.dataset.encryptedValue;
                }
            });
        });
    }

    // دوال التشفير
    generateEncryptionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    encryptText(text) {
        try {
            // تشفير بسيط (في الإنتاج استخدم AES)
            return btoa(text.split('').map(char => 
                String.fromCharCode(char.charCodeAt(0) ^ 123)
            ).join(''));
        } catch (e) {
            return text;
        }
    }

    decryptText(encryptedText) {
        try {
            return atob(encryptedText).split('').map(char => 
                String.fromCharCode(char.charCodeAt(0) ^ 123)
            ).join('');
        } catch (e) {
            return encryptedText;
        }
    }

    calculateHash(content) {
        // حساب hash بسيط
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // تحويل إلى 32bit integer
        }
        return hash.toString();
    }

    // معالجات الأحداث الأمنية
    handleDevToolsDetection() {
        console.clear();
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial;">
                <h1 style="color: red;">⚠️ Security Alert</h1>
                <p>Developer tools detected. Access restricted for security.</p>
            </div>
        `;
    }

    handleIntegrityViolation(element) {
        console.warn('Content integrity violation detected:', element);
        
        // استعادة المحتوى الأصلي أو حظر الوصول
        element.style.display = 'none';
        
        // إرسال تقرير أمني
        this.reportSecurityIncident('integrity_violation', {
            element: element.tagName,
            timestamp: new Date().toISOString()
        });
    }

    handleTamperingDetection(functionName) {
        console.error(`Code tampering detected: ${functionName}`);
        
        // إعادة تحميل الصفحة أو حظر الوصول
        location.reload();
    }

    handleFormTampering(form) {
        console.warn('Form tampering detected:', form);
        
        // تعطيل النموذج
        form.style.pointerEvents = 'none';
        form.style.opacity = '0.5';
        
        // إظهار رسالة تحذير
        const warning = document.createElement('div');
        warning.textContent = 'Form has been disabled due to security concerns';
        warning.style.color = 'red';
        form.parentNode.insertBefore(warning, form);
    }

    handleSecureNavigation(link) {
        // التحقق من صحة المستخدم قبل التنقل
        if (this.isAuthorizedUser()) {
            const decryptedHref = this.decryptText(link.dataset.encryptedHref);
            window.location.href = decryptedHref;
        } else {
            alert('Access denied. Please login first.');
        }
    }

    addInvisibleWatermark(img) {
        // إضافة علامة مائية غير مرئية للصور
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        // إضافة بيانات مخفية
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // تعديل البكسلات بشكل طفيف لإضافة العلامة المائية
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] | 1; // تعديل البت الأخير للأحمر
        }
        
        ctx.putImageData(imageData, 0, 0);
        img.src = canvas.toDataURL();
    }

    isAuthorizedUser() {
        // فحص تصريح المستخدم
        return sessionStorage.getItem('user_authorized') === 'true';
    }

    reportSecurityIncident(type, details) {
        const report = {
            type: type,
            details: details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log('Security incident:', report);
        
        // في الإنتاج، أرسل التقرير إلى الخادم
        // fetch('/api/security/incident', {
        //     method: 'POST',
        //     body: JSON.stringify(report)
        // });
    }
}

// تشغيل نظام حماية المحتوى
document.addEventListener('DOMContentLoaded', () => {
    new ContentSecurity();
});

// حماية الكود من التعديل
Object.freeze(ContentSecurity);
Object.freeze(ContentSecurity.prototype);