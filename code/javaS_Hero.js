
class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.isTransitioning = false;
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Add indicator event listeners
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Start auto-slide
    this.startAutoSlide();

    // Pause auto-slide on hover
    const slider = document.getElementById('heroSlider');
    slider.addEventListener('mouseenter', () => this.stopAutoSlide());
    slider.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  goToSlide(slideIndex) {
    if (this.isTransitioning || slideIndex === this.currentSlide) return;

    this.isTransitioning = true;

    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');

    // Update current slide
    this.currentSlide = slideIndex;

    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');

    // Reset transition flag after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  nextSlide() {
    const nextIndex = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Initialize the slider when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});
// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navHeight = document.querySelector('.nav-container').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});