// الحماية النهائية ضد F12 - لا يمكن تعطيلها
!function(){
    "use strict";
    
    // متغيرات محمية
    var blocked = false;
    var attempts = 0;
    
    // دالة الحماية الرئيسية
    function protect() {
        // منع جميع اختصارات لوحة المفاتيح
        document.onkeydown = document.onkeyup = document.onkeypress = function(e) {
            e = e || window.event;
            
            // F12
            if (e.keyCode === 123) {
                block();
                return false;
            }
            
            // Ctrl+Shift+I
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                block();
                return false;
            }
            
            // Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                block();
                return false;
            }
            
            // Ctrl+Shift+J
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                block();
                return false;
            }
            
            // Ctrl+U
            if (e.ctrlKey && e.keyCode === 85) {
                block();
                return false;
            }
            
            // Ctrl+S
            if (e.ctrlKey && e.keyCode === 83) {
                block();
                return false;
            }
            
            // Ctrl+A
            if (e.ctrlKey && e.keyCode === 65) {
                block();
                return false;
            }
            
            // Ctrl+P
            if (e.ctrlKey && e.keyCode === 80) {
                block();
                return false;
            }
        };
        
        // منع النقر بالزر الأيمن
        document.oncontextmenu = function() {
            block();
            return false;
        };
        
        // كشف أدوات المطورين
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
                block();
            }
        }, 100);
        
        // كشف debugger
        setInterval(function() {
            var start = +new Date();
            debugger;
            var end = +new Date();
            if (end - start > 100) {
                block();
            }
        }, 1000);
    }
    
    // دالة الحظر
    function block() {
        if (blocked) return;
        blocked = true;
        attempts++;
        
        // إخفاء المحتوى فوراً
        document.body.style.display = 'none';
        document.documentElement.style.display = 'none';
        
        // إنشاء صفحة الحظر
        var blockPage = document.createElement('div');
        blockPage.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:Arial;z-index:999999;"><h1 style="color:#ff0000;font-size:4rem;margin-bottom:2rem;">🚫 BLOCKED</h1><p style="font-size:1.5rem;text-align:center;">Developer tools detected!</p><p style="font-size:1rem;margin-top:1rem;">Attempts: ' + attempts + '</p><p style="font-size:0.8rem;margin-top:2rem;opacity:0.7;">This page will reload automatically...</p></div>';
        
        document.body = blockPage;
        document.documentElement.appendChild(blockPage);
        
        // إعادة تحميل الصفحة
        setTimeout(function() {
            location.reload();
        }, 2000);
        
        // منع أي تفاعل
        window.onbeforeunload = function() {
            return "Security protection active";
        };
    }
    
    // تشغيل الحماية
    protect();
    
    // حماية إضافية عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protect);
    } else {
        protect();
    }
    
    // حماية من إزالة الحماية
    Object.freeze(protect);
    Object.freeze(block);
    
    // مراقبة محاولات تعديل الكود
    var originalConsole = console.log;
    console.log = function() {
        block();
        return originalConsole.apply(console, arguments);
    };
    
    // حماية من eval
    window.eval = function() {
        block();
        return null;
    };
    
    // حماية من Function constructor
    window.Function = function() {
        block();
        return function() {};
    };
    
}();
