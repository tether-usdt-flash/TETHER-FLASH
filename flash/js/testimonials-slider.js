document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (slides.length > 0 && dotsContainer) {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = function() { currentSlide(i + 1); };
            dotsContainer.appendChild(dot);
        }
    }
    
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            plusSlides(-1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            plusSlides(1);
        });
    }
    
    showSlides(slideIndex);
    
    setInterval(() => plusSlides(1), 20000);
    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[slideIndex-1].classList.add('active');
        dots[slideIndex-1].classList.add('active');
    }
});
