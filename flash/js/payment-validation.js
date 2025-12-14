// Payment Form Validation and Redirect
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const txIdInput = document.getElementById('txId');
    const submitBtn = form?.querySelector('button[type="submit"]');
    
    if (!form || !txIdInput || !submitBtn) return;
    
    // Disable submit button initially
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
    
    // Enable/disable button based on input
    txIdInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const txId = txIdInput.value.trim();
        if (txId) {
            // Redirect to account-info page
            window.location.href = 'account-info.html';
        }
    });
});
