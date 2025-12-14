// 🔄 Self-Healing System
(function() {
    'use strict';
    
    // Store original state
    const ORIGINAL_STATE = {
        title: document.title,
        bodyClass: document.body.className,
        scripts: Array.from(document.scripts).map(s => s.src || s.textContent.substring(0, 100))
    };
    
    // Healing functions
    const heal = {
        title() {
            if (document.title !== ORIGINAL_STATE.title) {
                document.title = ORIGINAL_STATE.title;
            }
        },
        
        body() {
            if (document.body.className !== ORIGINAL_STATE.bodyClass) {
                document.body.className = ORIGINAL_STATE.bodyClass;
            }
        },
        
        scripts() {
            const current = Array.from(document.scripts).map(s => s.src || s.textContent.substring(0, 100));
            if (current.length !== ORIGINAL_STATE.scripts.length) {
                location.reload();
            }
        },
        
        styles() {
            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(style => {
                if (style.textContent && style.textContent.includes('display: none !important')) {
                    style.remove();
                }
            });
        },
        
        attributes() {
            ['contenteditable', 'spellcheck', 'draggable'].forEach(attr => {
                document.querySelectorAll(`[${attr}]`).forEach(el => {
                    if (el.getAttribute(attr) !== el.dataset[attr]) {
                        el.removeAttribute(attr);
                    }
                });
            });
        }
    };
    
    // Monitor DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Restore removed security scripts
            if (mutation.type === 'childList' && mutation.removedNodes.length) {
                mutation.removedNodes.forEach(node => {
                    if (node.tagName === 'SCRIPT' && node.src && node.src.includes('security')) {
                        console.warn('Security script removed, reloading...');
                        location.reload();
                    }
                });
            }
            
            // Remove suspicious elements
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'IFRAME' && !node.src.includes(location.hostname)) {
                        node.remove();
                    }
                });
            }
        });
    });
    
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true
    });
    
    // Continuous healing
    setInterval(() => {
        Object.values(heal).forEach(fn => fn());
    }, 2000);
    
    // Protect against page unload
    window.addEventListener('beforeunload', (e) => {
        if (!sessionStorage.getItem('_allow_unload')) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // Protect against visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            sessionStorage.setItem('_hidden_at', Date.now());
        } else {
            const hiddenAt = sessionStorage.getItem('_hidden_at');
            if (hiddenAt && Date.now() - hiddenAt > 300000) {
                location.reload();
            }
        }
    });
    
})();
