document.addEventListener('DOMContentLoaded', function () {
  const switcher = document.querySelector('.language-switcher');
  const toggleBtn = switcher.querySelector('.language-switcher__toggle');
  const list = switcher.querySelector('.language-switcher__list');
  const options = switcher.querySelectorAll('li[role="option"]');

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    list.classList.toggle('lang-open');
  });
  options.forEach(option => {
    option.addEventListener('click', function (e) {
      const link = option.querySelector('a');
      const flag = link.querySelector('img').cloneNode(true);
      const name = link.textContent.trim();

      toggleBtn.innerHTML = '';
      toggleBtn.appendChild(flag);
      toggleBtn.insertAdjacentHTML('beforeend', `<span>${name}</span>`);
      window.location.href = link.href;
    });
  });

  document.addEventListener('click', function (e) {
    if (!switcher.contains(e.target)) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      list.classList.remove('lang-open');
    }
  });


  const heroSlider = new Swiper('.hero_slider', {
    loop: true,
    speed: 600,
    spaceBetween: 16,

    pagination: {
      el: '.hero_slider__pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.hero_slider__button-next',
      prevEl: '.hero_slider__button-prev',
    },

    

    breakpoints: {
      768: {
        slidesPerView: 1,
      },
     
    },
  });
















});