// Payment Form Validation for Alternative Payment Pages
document.addEventListener('DOMContentLoaded', function() {
    const txIdInput = document.getElementById('txId');
    const verifyBtn = document.querySelector('button[onclick="verifyPayment()"]');
    
    if (!txIdInput || !verifyBtn) return;
    
    // Disable button initially
    verifyBtn.disabled = true;
    verifyBtn.style.opacity = '0.5';
    verifyBtn.style.cursor = 'not-allowed';
    
    // Enable/disable button based on input
    txIdInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            verifyBtn.disabled = false;
            verifyBtn.style.opacity = '1';
            verifyBtn.style.cursor = 'pointer';
        } else {
            verifyBtn.disabled = true;
            verifyBtn.style.opacity = '0.5';
            verifyBtn.style.cursor = 'not-allowed';
        }
    });
    
    // Override verifyPayment function
    window.verifyPayment = function() {
        const txId = txIdInput.value.trim();
        if (txId) {
            window.location.href = 'account-info.html';
        }
    };
});
