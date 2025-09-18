document.addEventListener('DOMContentLoaded', function () {

  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  });

  const dropdownBtn = document.querySelector('.header_dropdown-btn');
  const headerCenter = document.querySelector('.header_center');
  const closeDropBtn = document.querySelector('.dropdow-menu-close');
  const menuLinks = document.querySelectorAll('.nav_list-item a, .language-switcher__list button');
  function closeMenu() {
    document.body.classList.remove('header-drop-menu');
  }
  if (dropdownBtn) {
    dropdownBtn.addEventListener('click', () => {
      if (window.innerWidth <= 920) {
        document.body.classList.toggle('header-drop-menu');
      }
    });
  }
  if (closeDropBtn) {
    closeDropBtn.addEventListener('click', closeMenu);
  }
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', (e) => {
    if (
      document.body.classList.contains('header-drop-menu') &&
      headerCenter &&
      !headerCenter.contains(e.target) &&
      !dropdownBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });


  const switcher = document.querySelector('.language-switcher');
  const toggleBtn = switcher.querySelector('.language-switcher__toggle');
  const list = switcher.querySelector('.language-switcher__list');
  const options = list.querySelectorAll('li[role="option"] button');
  const flagImg = toggleBtn.querySelector('.language-switcher__flag');

  const defaultOption = list.querySelector('li[role="option"][aria-selected="true"]');
  if (defaultOption) {
    defaultOption.classList.add('lang-active');
    const img = defaultOption.querySelector('img').getAttribute('src');
    flagImg.setAttribute('src', img);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !expanded);
    switcher.classList.toggle('lang-open', !expanded);
  });

  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = option.querySelector('img').getAttribute('src');
      flagImg.setAttribute('src', img);

      toggleBtn.setAttribute('aria-expanded', 'false');
      switcher.classList.remove('lang-open');

      list.querySelectorAll('li').forEach(li => {
        li.removeAttribute('aria-selected');
        li.classList.remove('lang-active');
      });

      option.parentElement.setAttribute('aria-selected', 'true');
      option.parentElement.classList.add('lang-active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      switcher.classList.remove('lang-open');
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

  /* слайдер секции SENSOR */

  const sensorSlider = new Swiper('.sensor-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,


  });





  /* модалка секции SENSOR */

  const popup = document.querySelector('.sensor_popup');
  const popupContent = popup.querySelector('.sensor_popup-wrapper');
  const closeBtn = popup.querySelector('.sensor-close');
  const triggers = document.querySelectorAll('.sensor_btn-item, .sensor_ask');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollBarWidth + 'px';
      popup.classList.add('sensor-open');
    });
  });
  function closePopup() {
    popup.classList.remove('sensor-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => {
    if (!popupContent.contains(e.target)) {
      closePopup();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  });






  /* Табы секции Application */
  (function () {
    const tabs = document.querySelectorAll('.application_tabs-item');
    const imgs = document.querySelectorAll('.application_img-item');
    if (!tabs.length || tabs.length !== imgs.length) return;

    const DURATION = 5000;
    let idx = 0;
    let timer;
    let startTime;
    let remaining = DURATION;
    let isPaused = false;

    function circleLen(circle) {
      const r = parseFloat(circle.getAttribute('r')) || 16;
      return 2 * Math.PI * r;
    }

    function resetProgress(el) {
      const pr = el.querySelector('.progress');
      if (!pr) return;
      const len = circleLen(pr);
      pr.style.transition = 'none';
      pr.style.strokeDasharray = String(len);
      pr.style.strokeDashoffset = String(len);
    }

    function startProgress(el, time = DURATION, fromOffset = null) {
      const pr = el.querySelector('.progress');
      if (!pr) return;

      const len = circleLen(pr);
      let currentOffset = fromOffset !== null ? fromOffset : len;

      pr.style.transition = 'none';
      pr.style.strokeDasharray = String(len);
      pr.style.strokeDashoffset = String(currentOffset);
      pr.getBoundingClientRect();

      pr.style.transition = `stroke-dashoffset ${time}ms linear`;
      pr.style.strokeDashoffset = '0';

      startTime = Date.now();
      remaining = time;
      isPaused = false;

      clearTimeout(timer);
      timer = setTimeout(() => {
        idx = (idx + 1) % tabs.length;
        activateDesktop(idx);
      }, time);
    }

    function setActiveImage(i) {
      imgs.forEach((sl, k) => sl.classList.toggle('apps-active', k === i));
    }

    function activateDesktop(i) {
      clearTimeout(timer);
      tabs.forEach((el, k) => {
        el.classList.toggle('apps-active', k === i);
        resetProgress(el);
      });
      setActiveImage(i);
      startProgress(tabs[i], DURATION);
      idx = i;
    }

    if (window.innerWidth >= 768) {
      // ПК: табы + прогресс + пауза при наведении
      tabs.forEach((el, i) => {
        el.addEventListener('click', () => activateDesktop(i));

        el.addEventListener('mouseenter', () => {
          if (!el.classList.contains('apps-active')) return;
          clearTimeout(timer);

          const elapsed = Date.now() - startTime;
          remaining = Math.max(0, remaining - elapsed);

          const pr = el.querySelector('.progress');
          const currentOffset = window.getComputedStyle(pr).getPropertyValue('stroke-dashoffset');
          pr.style.transition = 'none';
          pr.style.strokeDashoffset = currentOffset;

          el.dataset.offset = currentOffset;
          el.classList.add('paused');
          isPaused = true;
        });

        el.addEventListener('mouseleave', () => {
          if (!el.classList.contains('apps-active')) return;
          if (!isPaused) return;

          el.classList.remove('paused');
          const fromOffset = parseFloat(el.dataset.offset || '0');
          startProgress(el, remaining, fromOffset);
        });
      });

      activateDesktop(0);
    } else {
      // МОБИЛКА: только Swiper, без прогресса
      const swiper = new Swiper('.application_tabs', {
        slidesPerView: 1,
        spaceBetween: 16,
        autoplay: {
          delay: DURATION,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.application_button-next',
          prevEl: '.application_button-prev',
        },
        loop: false,
        on: {
          init() {
            setActiveImage(this.realIndex);
          },
          slideChange() {
            setActiveImage(this.realIndex);
          }
        }
      });
    }
  })();









  /* Скрипт для работы аккордеона */
  const items = document.querySelectorAll(".answer_accord_item");
  items.forEach(item => {
    const btns = item.querySelectorAll(".answer_accord-btn, .answer_open-btn");
    const content = item.querySelector(".answer_accord-descript");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("answer-active");

        items.forEach(i => {
          i.classList.remove("answer-active");
          const c = i.querySelector(".answer_accord-descript");
          c.style.maxHeight = 0;
        });

        if (!isActive) {
          item.classList.add("answer-active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  });


  const popupVideoPlay = document.getElementById("videoPopup");
  const video = document.getElementById("popupVideo");
  const openBtns = document.querySelectorAll(".hero_play-btn, .hero_play-btn-mb");
  const closeBtnVideo = popupVideoPlay.querySelector(".video-popup__close");
  const overlay = popupVideoPlay.querySelector(".video-popup__overlay");

  function openPopup() {
    popupVideoPlay.classList.add("video-active");
    video.currentTime = 0;
    video.play();
  }

  function closePopup() {
    popupVideoPlay.classList.remove("video-active");
    video.pause();
  }

  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openPopup();
    });
  });

  closeBtnVideo.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);



});

