/**
 * معالج الفيديو الاحترافي على شاشة الهاتف في الهيرو
 * Hero Phone Video Professional Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.querySelector('#phone-content video');
    const videoContainer = videoElement ? videoElement.parentElement : null;

    if (!videoElement || !videoContainer) {
        console.log('Video element not found');
        return;
    }

    // ===== تحسينات تشغيل الفيديو =====
    
    // ضمان تشغيل الفيديو بدون صوت
    videoElement.muted = true;
    videoElement.defaultMuted = true;
    
    // تحسين جودة التشغيل
    videoElement.preload = 'metadata';
    videoElement.playsInline = true;
    
    // إعادة محاولة التشغيل التلقائي
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log('Autoplay prevented, attempting on user interaction');
            // محاولة التشغيل عند أول تفاعل المستخدم
            const playOnInteraction = () => {
                videoElement.play().catch(() => {});
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
    }

    // ===== تحسينات الأداء =====
    
    // تحميل الفيديو بكفاءة
    if (videoElement.readyState === videoElement.HAVE_NOTHING) {
        videoElement.addEventListener('loadedmetadata', () => {
            console.log('Video metadata loaded');
        });
    }

    // معالجة أخطاء الفيديو
    videoElement.addEventListener('error', () => {
        console.error('Video loading error:', videoElement.error);
        videoContainer.style.opacity = '0.6';
        // محاولة إعادة التحميل
        setTimeout(() => {
            videoElement.load();
            videoElement.play().catch(() => {});
        }, 2000);
    });

    // ===== تأثيرات بصرية تفاعلية =====
    
    // إضافة تأثير عند الهوفر على الهاتف
    if (window.innerWidth > 768) {
        videoContainer.addEventListener('mouseenter', () => {
            videoContainer.style.transform = 'translateY(-4px) scale(1.02)';
            videoContainer.style.filter = 'brightness(1.1)';
        });

        videoContainer.addEventListener('mouseleave', () => {
            videoContainer.style.transform = 'translateY(0) scale(1)';
            videoContainer.style.filter = 'brightness(1)';
        });
    }

    // ===== معالجة الاستجابة على الأجهزة المحمولة =====
    
    // تحسين الأداء على الأجهزة المحمولة
    if (window.innerWidth <= 768) {
        // تقليل دقة الفيديو على الهواتف
        videoElement.style.willChange = 'auto';
        
        // تحسين الأداء على الأجهزة الضعيفة
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            videoContainer.style.animation = 'none';
        }
    }

    // ===== مراقبة حالة الشاشة =====
    
    // إيقاف الفيديو عند إخفاء الصفحة
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            videoElement.pause();
        } else {
            videoElement.play().catch(() => {});
        }
    });

    // ===== محسنات إضافية =====
    
    // تحسين جودة الفيديو
    videoElement.addEventListener('playing', () => {
        console.log('Video is playing');
    });

    // معالجة نهاية الفيديو
    videoElement.addEventListener('ended', () => {
        // إعادة تشغيل الفيديو
        videoElement.currentTime = 0;
        videoElement.play().catch(() => {});
    });

    // ===== إحصائيات المشاهدة (اختياري) =====
    
    let videoPlayTime = 0;
    let videoStartTime = Date.now();

    videoElement.addEventListener('play', () => {
        videoStartTime = Date.now();
    });

    videoElement.addEventListener('pause', () => {
        videoPlayTime += (Date.now() - videoStartTime) / 1000;
    });

    // إرسال إحصائيات عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
        if (!document.hidden) {
            videoPlayTime += (Date.now() - videoStartTime) / 1000;
        }
        // يمكن إرسال البيانات هنا إلى خادم التحليلات
        console.log('Total video play time:', Math.round(videoPlayTime), 'seconds');
    });

    // ===== معالجة تغيير حجم النافذة =====
    
    window.addEventListener('resize', () => {
        // إعادة حساب حجم الفيديو إذا لزم الأمر
        if (videoElement.parentElement) {
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
        }
    });

    // ===== تحسينات الوصول =====
    
    // إضافة أدوار ARIA للفيديو
    videoContainer.setAttribute('role', 'presentation');
    videoElement.setAttribute('aria-label', 'USDT Flash Platform Demo Video');

    console.log('Hero phone video handler initialized successfully');
});

// ===== معالج متقدم للفيديو المتجاوب =====
(function() {
    // معالجة تحميل الفيديو المتقدمة
    const setupVideoResponsive = () => {
        const video = document.querySelector('#phone-content video');
        if (!video) return;

        // تحسين التوافق مع المتصفحات
        if (!video.canPlayType('video/mp4')) {
            console.warn('MP4 video format not supported');
            return;
        }

        // معالجة التخزين المؤقت
        video.addEventListener('progress', () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const duration = video.duration;
                if (duration > 0) {
                    const percentBuffered = (bufferedEnd / duration) * 100;
                    console.log('Video buffered:', Math.round(percentBuffered) + '%');
                }
            }
        });
    };

    // تشغيل الإعداد عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupVideoResponsive);
    } else {
        setupVideoResponsive();
    }
})();