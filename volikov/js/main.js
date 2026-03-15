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


const achievementSlider = new Swiper('.achievement_bottom-slider', {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 52,
  speed: 5000,

  autoplay: {
    delay: 0,
    disableOnInteraction: false
  }
});



const body = document.body;
const burgerOpen = document.querySelector('.burger_open');
const headerCenter = document.querySelector('.header_center');

function openMenu() {
    body.classList.add('menu-open');
}

function closeMenu() {
    body.classList.remove('menu-open');
}

burgerOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
});

document.querySelectorAll('.burger_close, .close_btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });
});

document.addEventListener('click', (e) => {
    if (!body.classList.contains('menu-open')) return;

    if (
        !headerCenter.contains(e.target) &&
        !burgerOpen.contains(e.target)
    ) {
        closeMenu();
    }
});