document.addEventListener('DOMContentLoaded', function() {
    const addReviewBtn = document.getElementById('add-review-btn');
    
    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.id = 'review-modal';
            modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn';
            
            modal.innerHTML = `
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl border border-emerald-500/30 animate-slideUp max-h-[90vh] overflow-y-auto">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl relative">
                        <button class="close-modal absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all hover:rotate-90">
                            <i class="fas fa-times text-sm sm:text-lg"></i>
                        </button>
                        <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-white">Share Your Experience</h3>
                        <p class="text-sm sm:text-base text-emerald-100 mt-1 sm:mt-2">Help others discover USDT-FLASH</p>
                    </div>
                    
                    <div class="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                        <div>
                            <label class="block text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">Your Name</label>
                            <input type="text" id="review-name" class="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Enter your full name">
                        </div>
                        
                        <div>
                            <label class="block text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">Rating</label>
                            <div class="flex items-center justify-center gap-2 sm:gap-4 bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div class="rating-stars flex gap-2 sm:gap-3">
                                    <i class="far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110" data-rating="1"></i>
                                    <i class="far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110" data-rating="2"></i>
                                    <i class="far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110" data-rating="3"></i>
                                    <i class="far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110" data-rating="4"></i>
                                    <i class="far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110" data-rating="5"></i>
                                </div>
                            </div>
                            <div class="text-center mt-2 sm:mt-3">
                                <span class="rating-text text-gray-400 text-sm sm:text-base lg:text-lg font-medium">Click to rate</span>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white font-bold mb-2 sm:mb-3 text-base sm:text-lg">Your Review</label>
                            <textarea id="review-comment" rows="4" class="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none" placeholder="Share your experience with USDT-FLASH..."></textarea>
                        </div>
                    </div>
                    
                    <div class="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button class="cancel-modal flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all">Cancel</button>
                        <button class="submit-review flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all hover:scale-105 shadow-lg">Submit Review</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            let selectedRating = 0;
            const stars = modal.querySelectorAll('.rating-stars i');
            const ratingText = modal.querySelector('.rating-text');
            
            stars.forEach(star => {
                star.onclick = function() {
                    selectedRating = parseInt(this.getAttribute('data-rating'));
                    updateStars(selectedRating);
                    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                    ratingText.textContent = selectedRating + '/5 - ' + texts[selectedRating];
                    ratingText.className = 'rating-text text-yellow-400 text-xl font-bold';
                };
            });
            
            function updateStars(rating) {
                stars.forEach((star, index) => {
                    if (index < rating) {
                        star.className = 'fas fa-star text-3xl sm:text-4xl lg:text-5xl text-yellow-400 cursor-pointer transition-all';
                    } else {
                        star.className = 'far fa-star text-3xl sm:text-4xl lg:text-5xl text-gray-600 cursor-pointer hover:text-yellow-400 transition-all hover:scale-110';
                    }
                });
            }
            
            function closeModal() {
                modal.classList.add('animate-fadeOut');
                setTimeout(() => document.body.removeChild(modal), 300);
            }
            
            modal.querySelector('.close-modal').onclick = closeModal;
            modal.querySelector('.cancel-modal').onclick = closeModal;
            
            modal.querySelector('.submit-review').onclick = function() {
                const name = document.getElementById('review-name').value.trim();
                const comment = document.getElementById('review-comment').value.trim();
                
                if (!name || !comment || selectedRating === 0) {
                    alert('Please fill all fields and select a rating');
                    return;
                }
                
                addNewReview(name, comment, selectedRating);
                closeModal();
                
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 right-4 sm:top-8 sm:right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl z-[10000] animate-slideDown text-sm sm:text-base';
                successMsg.innerHTML = '<i class="fas fa-check-circle mr-2 sm:mr-3"></i>Review submitted successfully!';
                document.body.appendChild(successMsg);
                setTimeout(() => document.body.removeChild(successMsg), 3000);
            };
            
            modal.onclick = function(e) {
                if (e.target === modal) closeModal();
            };
        });
    }
    
    function addNewReview(name, comment, rating) {
        const slider = document.querySelector('.testimonials-slider');
        const newSlide = document.createElement('div');
        newSlide.className = 'testimonial-slide';
        
        const firstLetter = name.charAt(0).toUpperCase();
        const stars = Array(5).fill(0).map((_, i) => 
            i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
        ).join('');
        
        newSlide.innerHTML = `
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div class="flex items-center mb-6">
                    <div class="w-20 h-20 rounded-full flex items-center justify-center mr-4 text-white text-3xl font-black" style="background: linear-gradient(135deg, #0f1419 0%, #1a2e1a 50%, #26a17b 100%); box-shadow: 0 10px 30px rgba(38, 161, 123, 0.5);">
                        ${firstLetter}
                    </div>
                    <div>
                        <h3 class="font-bold text-white text-xl">${name}</h3>
                        <div class="flex text-yellow-400 mt-2">
                            ${stars}
                        </div>
                    </div>
                </div>
                <p class="text-gray-100 text-lg leading-relaxed italic">"${comment}"</p>
            </div>
        `;
        
        slider.appendChild(newSlide);
        
        const dotsContainer = document.querySelector('.testimonial-dots');
        const newDot = document.createElement('span');
        newDot.className = 'dot';
        dotsContainer.appendChild(newDot);
    }
});
