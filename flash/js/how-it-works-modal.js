// How It Works Modal System - Modern Redesign
class HowItWorksModal {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Remove existing modal if any
        const existing = document.getElementById('how-it-works-modal');
        if (existing) existing.remove();

        this.createModal();
        // Add small delay for animation
        setTimeout(() => this.showModal(), 100);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'how-it-works-modal';
        // Backdrop with blur
        modal.className = 'fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 opacity-0 transition-opacity duration-300 invisible';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onclick="howItWorksModal.closeModal()"></div>
            ${this.getModalHTML()}
        `;
        document.body.appendChild(modal);
    }

    getModalHTML() {
        return `
            <div class="relative w-full max-w-4xl transform rounded-2xl p-6 text-center shadow-2xl transition-all duration-300 scale-95 opacity-0 bg-cover bg-center border border-white/10" id="modal-card" style="background-image: url('../2026/9bb2166f692173a67ca3af1055b2e026.png');">
                
                <!-- Overlay for readability -->
                <div class="absolute inset-0 bg-slate-900/50 rounded-2xl -z-10 backdrop-blur-[2px]"></div>
                
                <!-- Close Button -->
                <button onclick="howItWorksModal.closeModal()" class="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-sm border border-white/10 z-20">
                    <i class="fas fa-times text-lg"></i>
                </button>

                <!-- Language Switcher -->
                <div class="absolute top-4 left-4 flex bg-white/10 rounded-full p-1 shadow-sm border border-white/10 z-20 backdrop-blur-md">
                    <button onclick="howItWorksModal.switchLanguage('en')" id="lang-en" class="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-emerald-500 text-white shadow-md">EN</button>
                    <button onclick="howItWorksModal.switchLanguage('ar')" id="lang-ar" class="px-4 py-1.5 rounded-full text-xs font-bold transition-all text-gray-300 hover:text-white">AR</button>
                </div>

                <!-- Content Wrapper -->
                <div class="mt-6 relative z-10">
                    <!-- English Content -->
                    <div id="content-en">
                        ${this.getEnglishContent()}
                    </div>

                    <!-- Arabic Content -->
                    <div id="content-ar" class="hidden" dir="rtl">
                        ${this.getArabicContent()}
                    </div>
                </div>
            </div>
        `;
    }

    getEnglishContent() {
        return `
            <div class="flex flex-col items-center py-2">
                <div class="w-20 h-20 bg-white/10 rounded-3xl shadow-xl flex items-center justify-center mb-6 border border-white/20 transform rotate-3 hover:rotate-6 transition-transform duration-500 backdrop-blur-md">
                    <i class="fas fa-book-open text-3xl text-emerald-400 drop-shadow-lg"></i>
                </div>
                
                <h2 class="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-lg">System Guide</h2>
                <p class="text-gray-200 text-lg mb-6 leading-relaxed max-w-lg mx-auto font-medium drop-shadow-md">
                    To fully understand the system and know its purpose, please visit our official guide page.
                </p>

                <a href="guide.html" class="group relative w-full max-w-md flex items-center justify-center px-8 py-3.5 bg-emerald-500 text-white text-lg font-bold rounded-2xl hover:bg-emerald-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden border border-emerald-400/50">
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative flex items-center gap-3">
                        Visit Official Guide <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                </a>
                
                <button onclick="howItWorksModal.closeModal()" class="mt-4 text-sm text-gray-400 hover:text-white font-semibold transition-colors py-2 px-4 rounded-lg hover:bg-white/5">
                    Skip for now
                </button>
            </div>
        `;
    }

    getArabicContent() {
        return `
            <div class="flex flex-col items-center py-2">
                <div class="w-20 h-20 bg-white/10 rounded-3xl shadow-xl flex items-center justify-center mb-6 border border-white/20 transform -rotate-3 hover:-rotate-6 transition-transform duration-500 backdrop-blur-md">
                    <i class="fas fa-book-open text-3xl text-emerald-400 drop-shadow-lg"></i>
                </div>
                
                <h2 class="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-lg">دليل النظام</h2>
                <p class="text-gray-200 text-lg mb-6 leading-relaxed max-w-lg mx-auto font-medium drop-shadow-md">
                    من أجل فهم النظام ومعرفة الهدف منه بشكل كامل، يرجى زيارة صفحة الدليل الرسمي.
                </p>

                <a href="guide.html" class="group relative w-full max-w-md flex items-center justify-center px-8 py-3.5 bg-emerald-500 text-white text-lg font-bold rounded-2xl hover:bg-emerald-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden border border-emerald-400/50">
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative flex items-center gap-3">
                        زيارة الدليل الرسمي <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    </span>
                </a>
                
                <button onclick="howItWorksModal.closeModal()" class="mt-4 text-sm text-gray-400 hover:text-white font-semibold transition-colors py-2 px-4 rounded-lg hover:bg-white/5">
                    تخطي الآن
                </button>
            </div>
        `;
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        const enBtn = document.getElementById('lang-en');
        const arBtn = document.getElementById('lang-ar');
        const enContent = document.getElementById('content-en');
        const arContent = document.getElementById('content-ar');

        if (lang === 'en') {
            enBtn.className = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-emerald-500 text-white shadow-md';
            arBtn.className = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all text-gray-300 hover:text-white';
            enContent.classList.remove('hidden');
            arContent.classList.add('hidden');
        } else {
            arBtn.className = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-emerald-500 text-white shadow-md';
            enBtn.className = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all text-gray-300 hover:text-white';
            arContent.classList.remove('hidden');
            enContent.classList.add('hidden');
        }
    }

    showModal() {
        const modal = document.getElementById('how-it-works-modal');
        const card = document.getElementById('modal-card');
        if (modal) {
            modal.classList.remove('invisible', 'opacity-0');
            // Animate card
            if (card) {
                setTimeout(() => {
                    card.classList.remove('scale-95', 'opacity-0');
                    card.classList.add('scale-100', 'opacity-100');
                }, 50);
            }
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('how-it-works-modal');
        const card = document.getElementById('modal-card');
        if (modal && card) {
            card.classList.remove('scale-100', 'opacity-100');
            card.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                modal.classList.add('opacity-0');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }, 200);
        }
    }
}

// Initialize modal when script loads
let howItWorksModal;
document.addEventListener('DOMContentLoaded', function() {
    // Only show on payment pages
    if (window.location.pathname.includes('payment-')) {
        howItWorksModal = new HowItWorksModal();
    }
});
