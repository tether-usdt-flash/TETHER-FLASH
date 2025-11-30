// حماية قوية ضد F12 وأدوات المطورين
(function() {
    'use strict';

    // منع F12 وجميع اختصارات أدوات المطورين
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+I (أدوات المطورين)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+C (فحص العنصر)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+J (وحدة التحكم)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+U (عرض المصدر)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+S (حفظ الصفحة)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+A (تحديد الكل)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+P (طباعة)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // كشف فتح أدوات المطورين بطرق متعددة
    let devtools = false;
    
    // الطريقة الأولى: مراقبة حجم النافذة
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devtools) {
                devtools = true;
                handleDevToolsOpen();
            }
        } else {
            devtools = false;
        }
    }, 100);

    // الطريقة الثانية: استخدام debugger
    setInterval(function() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            handleDevToolsOpen();
        }
    }, 1000);

    // الطريقة الثالثة: مراقبة console
    let consoleOpened = false;
    Object.defineProperty(console, '_commandLineAPI', {
        get: function() {
            consoleOpened = true;
            handleDevToolsOpen();
            return undefined;
        }
    });

    // الطريقة الرابعة: فحص toString
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            consoleOpened = true;
            handleDevToolsOpen();
        }
    });

    // معالج فتح أدوات المطورين
    function handleDevToolsOpen() {
        // إخفاء المحتوى
        document.body.style.display = 'none';
        
        // إظهار رسالة تحذير
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #000, #333);
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                z-index: 999999;
            ">
                <h1 style="font-size: 3rem; margin-bottom: 2rem; color: #ff4444;">
                    🚫 ACCESS DENIED
                </h1>
                <p style="font-size: 1.5rem; text-align: center; max-width: 600px; line-height: 1.6;">
                    Developer tools are not allowed on this website for security reasons.
                </p>
                <p style="font-size: 1rem; margin-top: 2rem; opacity: 0.8;">
                    Please close developer tools and refresh the page.
                </p>
                <button onclick="location.reload()" style="
                    margin-top: 2rem;
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    background: #26a17b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Refresh Page
                </button>
            </div>
        `;
        
        // منع أي تفاعل
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
        // إعادة توجيه بعد 3 ثوانٍ
        setTimeout(function() {
            window.location.reload();
        }, 3000);
    }

    // منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // منع السحب والإفلات
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // منع التحديد
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // حماية إضافية من النسخ
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // تطبيق CSS للحماية
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        @media print {
            body { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    // حماية من إزالة الحماية
    Object.freeze(this);
    
})();