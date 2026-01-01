// 👻 Stealth Mode - Advanced Evasion
(function() {
    'use strict';
    
    // Hide from automation tools
    Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
    
    // Spoof navigator properties
    Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5]
    });
    
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
    });
    
    // Canvas Fingerprint Protection
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        const context = this.getContext('2d');
        const imageData = context.getImageData(0, 0, this.width, this.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = imageData.data[i] ^ 1;
        }
        context.putImageData(imageData, 0, 0);
        return originalToDataURL.apply(this, arguments);
    };
    
    // WebGL Fingerprint Protection
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(param) {
        if (param === 37445) return 'Intel Inc.';
        if (param === 37446) return 'Intel Iris OpenGL Engine';
        return getParameter.apply(this, arguments);
    };
    
    // Audio Fingerprint Protection
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const originalCreateOscillator = AudioContext.prototype.createOscillator;
        AudioContext.prototype.createOscillator = function() {
            const oscillator = originalCreateOscillator.apply(this, arguments);
            const originalStart = oscillator.start;
            oscillator.start = function() {
                oscillator.frequency.value = oscillator.frequency.value + Math.random() * 0.0001;
                return originalStart.apply(this, arguments);
            };
            return oscillator;
        };
    }
    
    // Font Fingerprint Protection
    Object.defineProperty(document, 'fonts', {
        get: () => ({
            check: () => true,
            load: () => Promise.resolve([]),
            ready: Promise.resolve()
        })
    });
    
    // Screen Resolution Spoofing
    Object.defineProperty(screen, 'width', {get: () => 1920});
    Object.defineProperty(screen, 'height', {get: () => 1080});
    Object.defineProperty(screen, 'availWidth', {get: () => 1920});
    Object.defineProperty(screen, 'availHeight', {get: () => 1040});
    
    // Timezone Spoofing
    Date.prototype.getTimezoneOffset = function() {
        return 0;
    };
    
    // Battery API Protection
    if (navigator.getBattery) {
        navigator.getBattery = () => Promise.reject('Not available');
    }
    
    // Notification API Protection
    if (window.Notification) {
        Notification.requestPermission = () => Promise.resolve('denied');
    }
    
    // Geolocation Protection
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = () => {};
        navigator.geolocation.watchPosition = () => {};
    }
    
    // Media Devices Protection
    if (navigator.mediaDevices) {
        navigator.mediaDevices.enumerateDevices = () => Promise.resolve([]);
        navigator.mediaDevices.getUserMedia = () => Promise.reject('Permission denied');
    }
    
    // Bluetooth Protection
    if (navigator.bluetooth) {
        navigator.bluetooth.requestDevice = () => Promise.reject('Not available');
    }
    
    // USB Protection
    if (navigator.usb) {
        navigator.usb.requestDevice = () => Promise.reject('Not available');
    }
    
    // Sensor APIs Protection
    ['Accelerometer', 'Gyroscope', 'Magnetometer', 'LinearAccelerationSensor'].forEach(sensor => {
        if (window[sensor]) {
            window[sensor] = class {
                constructor() {
                    throw new Error('Sensor not available');
                }
            };
        }
    });
    
    // Performance API Noise
    const originalNow = performance.now;
    performance.now = function() {
        return originalNow.apply(this, arguments) + Math.random() * 0.1;
    };
    
    console.log('%c🔒 Stealth Mode Active', 'color: #26a17b; font-size: 14px; font-weight: bold;');
    
})();
