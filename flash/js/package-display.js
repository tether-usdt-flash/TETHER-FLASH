// Package Display Script - Show selected package info on account-info page
(function() {
    'use strict';
    
    const packages = {
        'basic': {
            name: 'Trial Package',
            amount: '500 USDT FLASH',
            price: '$31',
            icon: '<img src="../icon/startup.png" class="w-8 h-8 inline-block" alt="Basic">'
        },
        'pro': {
            name: 'Professional Package',
            amount: '3,000 USDT FLASH',
            price: '$239',
            icon: '<i class="fas fa-gem text-blue-600 text-2xl"></i>'
        },
        'enterprise': {
            name: 'Enterprise Package',
            amount: '10,000 USDT FLASH',
            price: '$319',
            icon: '<i class="fas fa-crown text-purple-600 text-2xl"></i>'
        }
    };
    
    function getPackageFromURL() {
        const referrer = document.referrer;
        if (referrer.includes('payment-basic')) return 'basic';
        if (referrer.includes('payment-pro')) return 'pro';
        if (referrer.includes('payment-enterprise')) return 'enterprise';
        
        const stored = sessionStorage.getItem('selectedPackage');
        return stored || 'basic';
    }
    
    function displayPackageInfo() {
        const packageType = getPackageFromURL();
        const packageData = packages[packageType] || packages.basic;
        
        const infoHTML = `
            <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-xl p-6 mb-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">
                            ${packageData.icon} ${packageData.name}
                        </h3>
                        <p class="text-lg text-gray-600">
                            <span class="font-semibold text-green-600">${packageData.amount}</span>
                        </p>
                        <p class="text-xl font-bold text-blue-600 mt-1">${packageData.price}</p>
                    </div>
                    <div class="text-right">
                        <div class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            ✓ Selected
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const form = document.getElementById('accountForm');
        if (form) {
            form.insertAdjacentHTML('afterbegin', infoHTML);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayPackageInfo);
    } else {
        displayPackageInfo();
    }
})();
