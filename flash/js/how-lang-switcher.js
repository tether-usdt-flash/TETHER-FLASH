// Language Switcher - High Quality Implementation
(function() {
    'use strict';

    const translations = {
        en: {
            name: 'English',
            title: 'How It Works',
            subtitle: 'STEP-BY-STEP PROCESS',
            approved: '🏛️ TETHER APPROVED PROCESS',
            phone1Title: 'Purchase Package',
            phone1Desc: 'Select your USDT FLASH package',
            phone2Title: 'Convert to Meme',
            phone2Desc: 'Exchange USDT FLASH to meme coin',
            phone2Wait: 'Wait 24 hours',
            phone3Title: 'Sell & Receive',
            phone3Desc: 'Sell meme coin for real USDT',
            phone3Success: 'Real USDT Received',
            phone3Fee: '- 25% Fee',
            phone3Trade: 'Tradable & Withdrawable',
            step1Title: 'Step 1: Purchase',
            step1Desc: 'Choose your package and complete secure payment with USDT (TRC20)',
            step2Title: 'Step 2: Convert',
            step2Desc: 'Convert to PEPE, DOGE, or SHIBA and hold for 24 hours',
            step3Title: 'Step 3: Sell',
            step3Desc: 'Sell meme coin and receive real USDT (25% service fee applies)',
            ctaTitle: 'Ready to Start?',
            ctaDesc: 'Join 1.2M+ users who trust USDT FLASH',
            ctaBtn: 'Get Started Now',
            howStep1: 'Create Your Account',
            howStep1Desc: 'Register in minutes using just your email. Complete verification for higher limits and enhanced security features.',
            howStep2: 'Choose Your Package',
            howStep2Desc: 'Select from our professionally designed packages with competitive pricing and instant delivery guarantee.',
            howStep3: 'Secure Payment',
            howStep3Desc: 'Complete payment using USDT (TRC20) with military-grade encryption and blockchain verification for maximum security.',
            howStep4: 'Instant Delivery',
            howStep4Desc: 'Receive your USDT-FLASH instantly in your wallet within 5-15 minutes with full transaction tracking and support.'
        },
        ar: {
            name: 'العربية',
            title: 'كيف يعمل',
            subtitle: 'العملية خطوة بخطوة',
            approved: '🏛️ عملية معتمدة من تيثر',
            phone1Title: 'شراء الباقة',
            phone1Desc: 'اختر باقة USDT FLASH',
            phone2Title: 'تحويل إلى ميم',
            phone2Desc: 'تبادل USDT FLASH بعملة ميم',
            phone2Wait: 'انتظر 24 ساعة',
            phone3Title: 'بيع واستلام',
            phone3Desc: 'بيع عملة ميم للحصول على USDT حقيقي',
            phone3Success: 'تم استلام USDT حقيقي',
            phone3Fee: '- رسوم 25%',
            phone3Trade: 'قابل للتداول والسحب',
            step1Title: 'الخطوة 1: الشراء',
            step1Desc: 'اختر باقتك وأكمل الدفع الآمن بـ USDT (TRC20)',
            step2Title: 'الخطوة 2: التحويل',
            step2Desc: 'حوّل إلى PEPE أو DOGE أو SHIBA واحتفظ بها لمدة 24 ساعة',
            step3Title: 'الخطوة 3: البيع',
            step3Desc: 'بع عملة ميم واحصل على USDT حقيقي (تطبّق رسوم خدمة 25%)',
            ctaTitle: 'جاهز للبدء؟',
            ctaDesc: 'انضم إلى 1.2 مليون+ مستخدم يثقون في USDT FLASH',
            ctaBtn: 'ابدأ الآن',
            howStep1: 'إنشاء حسابك',
            howStep1Desc: 'سجّل في دقائق باستخدام بريدك الإلكتروني. أكمل التحقق للحصول على حدود أعلى وميزات أمان محسّنة.',
            howStep2: 'اختر باقتك',
            howStep2Desc: 'اختر من باقاتنا المصممة بشكل احترافي مع أسعار تنافسية وضمان تسليم فوري.',
            howStep3: 'دفع آمن',
            howStep3Desc: 'أكمل الدفع باستخدام USDT (TRC20) مع تشفير عسكري وتحقق بلوكتشين لأقصى أمان.',
            howStep4: 'تسليم فوري',
            howStep4Desc: 'استلم USDT-FLASH فوراً في محفظتك خلال 5-15 دقيقة مع تتبع كامل للمعاملة ودعم.'
        },
        fr: {
            name: 'Français',
            title: 'Comment ça marche',
            subtitle: 'PROCESSUS ÉTAPE PAR ÉTAPE',
            approved: '🏛️ PROCESSUS APPROUVÉ PAR TETHER',
            phone1Title: 'Acheter le forfait',
            phone1Desc: 'Sélectionnez votre forfait USDT FLASH',
            phone2Title: 'Convertir en Meme',
            phone2Desc: 'Échanger USDT FLASH contre une meme coin',
            phone2Wait: 'Attendre 24 heures',
            phone3Title: 'Vendre et recevoir',
            phone3Desc: 'Vendre la meme coin pour du vrai USDT',
            phone3Success: 'USDT réel reçu',
            phone3Fee: '- Frais 25%',
            phone3Trade: 'Négociable et retirable',
            step1Title: 'Étape 1: Achat',
            step1Desc: 'Choisissez votre forfait et effectuez un paiement sécurisé avec USDT (TRC20)',
            step2Title: 'Étape 2: Conversion',
            step2Desc: 'Convertir en PEPE, DOGE ou SHIBA et conserver pendant 24 heures',
            step3Title: 'Étape 3: Vente',
            step3Desc: 'Vendez la meme coin et recevez du vrai USDT (frais de service de 25%)',
            ctaTitle: 'Prêt à commencer?',
            ctaDesc: 'Rejoignez 1,2M+ utilisateurs qui font confiance à USDT FLASH',
            ctaBtn: 'Commencer maintenant',
            howStep1: 'Créez votre compte',
            howStep1Desc: 'Inscrivez-vous en quelques minutes avec votre email.',
            howStep2: 'Choisissez votre forfait',
            howStep2Desc: 'Sélectionnez parmi nos forfaits conçus professionnellement.',
            howStep3: 'Paiement sécurisé',
            howStep3Desc: 'Effectuez le paiement avec USDT (TRC20).',
            howStep4: 'Livraison instantanée',
            howStep4Desc: 'Recevez votre USDT-FLASH instantanément en 5-15 minutes.'
        },
        hi: {
            name: 'हिन्दी',
            title: 'यह कैसे काम करता है',
            subtitle: 'चरण-दर-चरण प्रक्रिया',
            approved: '🏛️ टीथर द्वारा अनुमोदित प्रक्रिया',
            phone1Title: 'पैकेज खरीदें',
            phone1Desc: 'अपना USDT FLASH पैकेज चुनें',
            phone2Title: 'मीम में बदलें',
            phone2Desc: 'USDT FLASH को मीम कॉइन में बदलें',
            phone2Wait: '24 घंटे प्रतीक्षा करें',
            phone3Title: 'बेचें और प्राप्त करें',
            phone3Desc: 'वास्तविक USDT के लिए मीम कॉइन बेचें',
            phone3Success: 'वास्तविक USDT प्राप्त',
            phone3Fee: '- 25% शुल्क',
            phone3Trade: 'व्यापार योग्य और निकासी',
            step1Title: 'चरण 1: खरीद',
            step1Desc: 'अपना पैकेज चुनें और USDT (TRC20) के साथ सुरक्षित भुगतान पूरा करें',
            step2Title: 'चरण 2: परिवर्तन',
            step2Desc: 'PEPE, DOGE या SHIBA में बदलें और 24 घंटे रखें',
            step3Title: 'चरण 3: बिक्री',
            step3Desc: 'मीम कॉइन बेचें और वास्तविक USDT प्राप्त करें',
            ctaTitle: 'शुरू करने के लिए तैयार?',
            ctaDesc: '1.2M+ उपयोगकर्ताओं के साथ शामिल हों',
            ctaBtn: 'अभी शुरू करें',
            howStep1: 'अपना खाता बनाएं',
            howStep1Desc: 'केवल अपने ईमेल का उपयोग करके मिनटों में पंजीकरण करें।',
            howStep2: 'अपना पैकेज चुनें',
            howStep2Desc: 'प्रतिस्पर्धी मूल्य के साथ हमारे पैकेज में से चुनें।',
            howStep3: 'सुरक्षित भुगतान',
            howStep3Desc: 'USDT (TRC20) का उपयोग करके भुगतान पूरा करें।',
            howStep4: 'तत्काल वितरण',
            howStep4Desc: '5-15 मिनट में अपने USDT-FLASH तुरंत प्राप्त करें।'
        },
        ja: {
            name: '日本語',
            title: '仕組み',
            subtitle: 'ステップバイステッププロセス',
            approved: '🏛️ テザー承認プロセス',
            phone1Title: 'パッケージ購入',
            phone1Desc: 'USDT FLASHパッケージを選択',
            phone2Title: 'ミームに変換',
            phone2Desc: 'USDT FLASHをミームコインに交換',
            phone2Wait: '24時間待つ',
            phone3Title: '売却と受取',
            phone3Desc: '本物のUSDTのためにミームコインを売る',
            phone3Success: '本物のUSDT受取',
            phone3Fee: '- 25%手数料',
            phone3Trade: '取引可能＆引出可能',
            step1Title: 'ステップ1: 購入',
            step1Desc: 'パッケージを選択し、USDT（TRC20）で安全な支払いを完了',
            step2Title: 'ステップ2: 変換',
            step2Desc: 'PEPE、DOGE、またはSHIBAに変換し、24時間保持',
            step3Title: 'ステップ3: 売却',
            step3Desc: 'ミームコインを売却し、本物のUSDTを受け取る',
            ctaTitle: '始める準備はできましたか？',
            ctaDesc: 'USDT FLASHを信頼する120万人以上のユーザーに参加',
            ctaBtn: '今すぐ始める',
            howStep1: 'アカウント作成',
            howStep1Desc: 'メールだけで数分で登録。',
            howStep2: 'パッケージ選択',
            howStep2Desc: '競争力のある価格のパッケージから選択。',
            howStep3: '安全な支払い',
            howStep3Desc: 'USDT（TRC20）で支払いを完了。',
            howStep4: '即時配信',
            howStep4Desc: '5〜15分でUSDT-FLASHを即座に受け取る。'
        },
        ru: {
            name: 'Русский',
            title: 'Как это работает',
            subtitle: 'ПОШАГОВЫЙ ПРОЦЕСС',
            approved: '🏛️ ПРОЦЕСС ОДОБРЕН TETHER',
            phone1Title: 'Купить пакет',
            phone1Desc: 'Выберите пакет USDT FLASH',
            phone2Title: 'Конвертировать в Meme',
            phone2Desc: 'Обменять USDT FLASH на мем-монету',
            phone2Wait: 'Подождите 24 часа',
            phone3Title: 'Продать и получить',
            phone3Desc: 'Продать мем-монету за настоящий USDT',
            phone3Success: 'Получен настоящий USDT',
            phone3Fee: '- Комиссия 25%',
            phone3Trade: 'Торгуемый и выводимый',
            step1Title: 'Шаг 1: Покупка',
            step1Desc: 'Выберите пакет и завершите безопасный платеж с USDT (TRC20)',
            step2Title: 'Шаг 2: Конвертация',
            step2Desc: 'Конвертируйте в PEPE, DOGE или SHIBA и держите 24 часа',
            step3Title: 'Шаг 3: Продажа',
            step3Desc: 'Продайте мем-монету и получите настоящий USDT',
            ctaTitle: 'Готовы начать?',
            ctaDesc: 'Присоединяйтесь к 1,2 млн+ пользователей',
            ctaBtn: 'Начать сейчас',
            howStep1: 'Создайте аккаунт',
            howStep1Desc: 'Зарегистрируйтесь за минуты, используя только email.',
            howStep2: 'Выберите пакет',
            howStep2Desc: 'Выберите из наших пакетов с конкурентными ценами.',
            howStep3: 'Безопасный платеж',
            howStep3Desc: 'Завершите платеж с USDT (TRC20).',
            howStep4: 'Мгновенная доставка',
            howStep4Desc: 'Получите USDT-FLASH мгновенно за 5-15 минут.'
        }
    };

    function init() {
        const btn = document.getElementById('langSelectorBtn');
        const menu = document.getElementById('langMenu');
        const currentText = document.getElementById('currentLangText');
        const options = document.querySelectorAll('[data-lang]');

        if (!btn || !menu) return;

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            btn.classList.toggle('active');
            menu.classList.toggle('show');
        });

        document.addEventListener('click', function() {
            btn.classList.remove('active');
            menu.classList.remove('show');
        });

        options.forEach(function(option) {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                const t = translations[lang];
                
                currentText.textContent = t.name;
                
                // Update section title
                var sectionTitle = document.querySelector('.text-5xl.md\\:text-6xl.font-black.text-white');
                if (sectionTitle) sectionTitle.textContent = t.title;
                
                var sectionSubtitle = document.querySelector('.text-emerald-300.font-bold.text-sm');
                if (sectionSubtitle) sectionSubtitle.textContent = t.subtitle;
                
                var approvedBadge = document.querySelector('.bg-emerald-500\\/20 span');
                if (approvedBadge) approvedBadge.textContent = t.approved;
                
                // Phone 1 - Purchase
                var phone1Titles = document.querySelectorAll('.text-white.font-bold.text-sm');
                if (phone1Titles[0]) phone1Titles[0].textContent = t.phone1Title;
                
                var phone1Descs = document.querySelectorAll('.text-\\[9px\\].text-center');
                if (phone1Descs[0]) phone1Descs[0].textContent = t.phone1Desc;
                
                // Phone 2 - Convert
                if (phone1Titles[1]) phone1Titles[1].textContent = t.phone2Title;
                if (phone1Descs[1]) phone1Descs[1].textContent = t.phone2Desc;
                
                var phone2Wait = document.querySelector('.text-blue-200.text-\\[8px\\].font-bold');
                if (phone2Wait) phone2Wait.textContent = t.phone2Wait;
                
                // Phone 3 - Sell
                if (phone1Titles[2]) phone1Titles[2].textContent = t.phone3Title;
                if (phone1Descs[2]) phone1Descs[2].textContent = t.phone3Desc;
                
                var phone3Success = document.querySelector('.text-emerald-300.text-\\[9px\\].font-bold.text-center');
                if (phone3Success) phone3Success.textContent = t.phone3Success;
                
                var phone3Fee = document.querySelector('.text-white.text-xs.font-black.text-center');
                if (phone3Fee) phone3Fee.textContent = t.phone3Fee;
                
                var phone3Trade = document.querySelector('.text-purple-200.text-\\[8px\\].font-bold');
                if (phone3Trade) phone3Trade.textContent = t.phone3Trade;
                
                // Step descriptions
                var stepTitles = document.querySelectorAll('.text-xl.font-black.text-white');
                if (stepTitles[0]) stepTitles[0].textContent = t.step1Title;
                if (stepTitles[1]) stepTitles[1].textContent = t.step2Title;
                if (stepTitles[2]) stepTitles[2].textContent = t.step3Title;
                
                var stepDescs = document.querySelectorAll('.text-sm');
                for (var i = 0; i < stepDescs.length; i++) {
                    if (stepDescs[i].classList.contains('text-emerald-200') && i === 0) {
                        stepDescs[i].textContent = t.step1Desc;
                    } else if (stepDescs[i].classList.contains('text-blue-200') && i === 1) {
                        stepDescs[i].textContent = t.step2Desc;
                    } else if (stepDescs[i].classList.contains('text-purple-200') && i === 2) {
                        stepDescs[i].textContent = t.step3Desc;
                    }
                }
                
                // CTA section
                var ctaTitle = document.querySelector('.text-2xl.font-black.text-white.mb-4');
                if (ctaTitle) ctaTitle.textContent = t.ctaTitle;
                
                var ctaDesc = document.querySelector('.text-emerald-200.mb-6');
                if (ctaDesc) ctaDesc.textContent = t.ctaDesc;
                
                var ctaBtn = document.querySelector('a[href="#pricing"] span');
                if (ctaBtn) ctaBtn.textContent = t.ctaBtn;

                btn.classList.remove('active');
                menu.classList.remove('show');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
