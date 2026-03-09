const swiper = new Swiper('.vision_slider', {
  slidesPerView: 1,
  navigation: { nextEl: '.vision_next', prevEl: '.vision_prev' },
});

const C = 57;
const duration = 4000;

let timer;

function runRing() {
  clearTimeout(timer);

  const activeSlide = swiper.slides[swiper.activeIndex];
  const ring = activeSlide?.querySelector('.vision_ring-progress');
  if (!ring) return;

  ring.style.transition = 'none';
  ring.style.strokeDasharray = C;
  ring.style.strokeDashoffset = C;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.transition = `stroke-dashoffset ${duration}ms linear`;
      ring.style.strokeDashoffset = 0;
    });
  });

  timer = setTimeout(() => swiper.slideNext(), duration);
}

swiper.on('init', runRing);
swiper.on('slideChangeTransitionStart', runRing);
swiper.init?.(); 

runRing();