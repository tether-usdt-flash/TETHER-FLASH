// Payment Form Validation for Reclaim Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const txIdInput = document.getElementById('txId');
    const originalTxIdInput = document.getElementById('originalTxId');
    const submitBtn = form?.querySelector('button[type="submit"]');
    
    if (!form || !txIdInput || !submitBtn) return;
    
    // Disable submit button initially
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
    
    // Check both inputs
    function checkInputs() {
        const txIdFilled = txIdInput.value.trim().length > 0;
        const originalTxIdFilled = originalTxIdInput ? originalTxIdInput.value.trim().length > 0 : true;
        
        if (txIdFilled && originalTxIdFilled) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Add event listeners
    txIdInput.addEventListener('input', checkInputs);
    if (originalTxIdInput) {
        originalTxIdInput.addEventListener('input', checkInputs);
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const txId = txIdInput.value.trim();
        const originalTxId = originalTxIdInput ? originalTxIdInput.value.trim() : '';
        
        if (txId && (!originalTxIdInput || originalTxId)) {
            window.location.href = 'account-info.html';
        }
    });
});
