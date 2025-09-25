document.addEventListener('DOMContentLoaded', function () {

  /* ===== Cookie popup ===== */
  (function () {
    const cookiePopup = document.querySelector(".cookie_popup");
    const cookieBtn = document.querySelector(".cookie_btn");
    if (!cookiePopup || !cookieBtn) return;

    cookiePopup.classList.add("cookie-show");
    cookieBtn.addEventListener("click", () => {
      cookiePopup.classList.remove("cookie-show");
    });
  })();


  /* ===== Header scroll ===== */
  (function () {
    const headerScroll = document.querySelector('.body');
    if (!headerScroll) return;

    window.addEventListener('scroll', () => {
      headerScroll.classList.toggle('scroll', window.scrollY > 0);
    });
  })();


  /* ===== Dropdown menu ===== */
  (function () {
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

    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
      if (
        document.body.classList.contains('header-drop-menu') &&
        headerCenter &&
        !headerCenter.contains(e.target) &&
        dropdownBtn &&
        !dropdownBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  })();


  /* ===== Language switcher ===== */
  (function () {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;

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
  })();


  /* ===== Hero slider ===== */
  (function () {
    const heroSliderEl = document.querySelector('.hero_slider');
    if (!heroSliderEl) return;

    new Swiper(heroSliderEl, {
      loop: true,
      speed: 600,
      spaceBetween: 16,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },
      pagination: {
        el: '.hero_slider__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero_slider__button-next',
        prevEl: '.hero_slider__button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 1 },
      },
    });
  })();


  /* ===== Sensor slider ===== */
  (function () {
    const sensorSliderEl = document.querySelector('.sensor-swiper');
    if (!sensorSliderEl) return;

    new Swiper(sensorSliderEl, {
      slidesPerView: 'auto',
      spaceBetween: 8,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },
      breakpoints: {
        450: { spaceBetween: 24 },
      },
    });
  })();


  /* ===== Sensor popup ===== */
  (function () {
    const sensorPopup = document.querySelector('.sensor_popup');
    if (!sensorPopup) return;

    const wrapper = sensorPopup.querySelector('.sensor_popup-wrapper');
    const sensorCloseBtn = sensorPopup.querySelector('.sensor-close');
    if (!wrapper) return;

    let scroller = null;
    let sentinel = null;
    let ro = null;

    function lockBody() {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = sw + 'px';
    }
    function unlockBody() {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    function findScroller(root) {
      if (root.scrollHeight > root.clientHeight + 1) return root;
      let best = null, bestOverflow = 0;
      const stack = Array.from(root.children);
      while (stack.length) {
        const n = stack.pop();
        const overflow = n.scrollHeight - n.clientHeight;
        if (overflow > bestOverflow + 1) {
          best = n;
          bestOverflow = overflow;
        }
        stack.push(...n.children);
      }
      return best || root;
    }

    function ensureSentinel() {
      if (!sentinel) {
        sentinel = document.createElement('div');
        sentinel.style.cssText = 'height:1px;width:1px;';
        scroller.appendChild(sentinel);
      } else if (sentinel.parentNode !== scroller) {
        sentinel.remove();
        scroller.appendChild(sentinel);
      }
    }

    function updateBottom() {
      if (!scroller) return;
      if (scroller.scrollHeight <= scroller.clientHeight + 1) {
        sensorPopup.classList.remove('at-bottom');
        return;
      }
      const rootBottom = scroller.getBoundingClientRect().bottom;
      const sBottom = sentinel.getBoundingClientRect().bottom;
      const atBottom = (sBottom - rootBottom) <= 1;
      sensorPopup.classList.toggle('at-bottom', atBottom);
    }

    function mountWatch() {
      scroller = findScroller(wrapper);
      ensureSentinel();
      scroller.addEventListener('scroll', updateBottom, { passive: true });
      if ('ResizeObserver' in window) {
        ro = new ResizeObserver(() => requestAnimationFrame(updateBottom));
        ro.observe(scroller);
        ro.observe(sentinel);
      }
      requestAnimationFrame(() => requestAnimationFrame(updateBottom));
    }

    function unmountWatch() {
      if (scroller) scroller.removeEventListener('scroll', updateBottom);
      if (ro) { ro.disconnect(); ro = null; }
      if (sentinel) { sentinel.remove(); sentinel = null; }
      sensorPopup.classList.remove('at-bottom');
    }

    function open() {
      lockBody();
      sensorPopup.classList.add('sensor-open');
      unmountWatch();
      mountWatch();
    }
    function close() {
      sensorPopup.classList.remove('sensor-open');
      unmountWatch();
      unlockBody();
    }

    document.querySelectorAll('.sensor_btn-item, .sensor_ask').forEach(btn => {
      btn.addEventListener('click', open);
    });

    if (sensorCloseBtn) sensorCloseBtn.addEventListener('click', close);

    sensorPopup.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  })();


  /* ===== Application tabs ===== */
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
      const swiper = new Swiper('.application_tabs', {
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: {
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true
        },
        navigation: {
          nextEl: '.application_button-next',
          prevEl: '.application_button-prev',
        },
        loop: false,
        on: {
          init() { setActiveImage(this.realIndex); },
          slideChange() { setActiveImage(this.realIndex); }
        }
      });
    }
  })();


  /* ===== Accordion ===== */
  (function () {
    const items = document.querySelectorAll(".answer_accord_item");
    if (!items.length) return;

    items.forEach(item => {
      const btns = item.querySelectorAll(".answer_accord-btn, .answer_open-btn");
      const content = item.querySelector(".answer_accord-descript");

      btns.forEach(btn => {
        btn.addEventListener("click", () => {
          const isActive = item.classList.contains("answer-active");

          items.forEach(i => {
            i.classList.remove("answer-active");
            const c = i.querySelector(".answer_accord-descript");
            if (c) c.style.maxHeight = 0;
          });

          if (!isActive) {
            item.classList.add("answer-active");
            if (content) content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });
    });
  })();


  /* ===== Video popup ===== */
  (function () {
    const popupVideoPlay = document.getElementById("videoPopup");
    if (!popupVideoPlay) return;

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

    if (closeBtnVideo) closeBtnVideo.addEventListener("click", closePopup);
    if (overlay) overlay.addEventListener("click", closePopup);

    popupVideoPlay.addEventListener("click", (e) => {
      if (!video.contains(e.target) && closeBtnVideo && !closeBtnVideo.contains(e.target)) {
        closePopup();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  })();


  /* ===== Appmonisensa slider ===== */

  (function () {
    const sliderEl = document.querySelector('.appmonisensa_slider');
    if (!sliderEl) return;

    const appSlider = new Swiper(sliderEl, {
      slidesPerView: 'auto',
      spaceBetween: 8,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },
      navigation: {
        nextEl: '.appmonisensa_slider-next',
        prevEl: '.appmonisensa_slider-prev',
      },
      breakpoints: {
        768: { spaceBetween: 24 },
      },
      loop: false,
      observer: true,
      observeParents: true,
      on: {
        init(swiper) { toggleNav(swiper); },
        slideChange(swiper) { toggleNav(swiper); },
        setTranslate(swiper) { toggleNav(swiper); },
        resize(swiper) { toggleNav(swiper); },
        observerUpdate(swiper) { toggleNav(swiper); },
      }
    });

    function elFromNav(ref) { return Array.isArray(ref) ? ref[0] : ref; }
    function toggleNav(swiper) {
      const prev = elFromNav(swiper.navigation.prevEl);
      const next = elFromNav(swiper.navigation.nextEl);
      if (!prev || !next) return;

      const EPS = 1;
      const atStart = Math.abs(swiper.translate - swiper.minTranslate()) <= EPS;
      const atEnd = Math.abs(swiper.translate - swiper.maxTranslate()) <= EPS;
      prev.style.visibility = 'hidden';
      next.style.visibility = 'hidden';

      if (atStart && !atEnd) {
        next.style.visibility = 'visible';
      } else if (atEnd && !atStart) {
        prev.style.visibility = 'visible';
      }
    }
  })();


  /******************************************************* */


  (function () {
    const popup = document.getElementById("appmonisensaPopup");
    if (!popup) return;
    const content = popup.querySelector(".appmonisensa_popup-content");
    const closeBtn = popup.querySelector(".appmonisensa_popup-close");
    const popupWrapper = popup.querySelector(".swiper-wrapper");
    document.querySelectorAll(".appmonisensa_slider-item").forEach(slide => {
      popupWrapper.appendChild(slide.cloneNode(true));
    });

    const popupSwiper = new Swiper(".appmonisensa_popup-slider", {
      slidesPerView: 1,
      spaceBetween: 8,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      },
      loop: false
    });
    document.querySelectorAll(".appmonisensa_slider-item img").forEach((img, index) => {
      img.addEventListener("click", () => {
        popup.classList.add("appmonisensa-active");
        popupSwiper.slideTo(index, 0);
      });
    });
    function closePopup() {
      popup.classList.remove("appmonisensa-active");
    }
    if (closeBtn) closeBtn.addEventListener("click", closePopup);
    popupWrapper.addEventListener("click", (e) => {
      if (!e.target.closest("img")) {
        closePopup();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  })();





  (function () {
    const text = document.querySelector(".appmonisensa_descript-text");
    const btn = document.querySelector(".appmonisensa_descript-btn");
    if (!text || !btn) return;
    const transitionTime = 400;
    text.style.overflow = "hidden";
    text.style.transition = `max-height ${transitionTime}ms ease`;
    text.style.maxHeight = "80px";
    btn.addEventListener("click", () => {
      const isExpanded = text.classList.contains("appmonisensa-expanded");

      if (isExpanded) {
        text.style.maxHeight = text.scrollHeight + "px";
        void text.offsetHeight;
        text.style.maxHeight = "80px";
        text.classList.remove("appmonisensa-expanded");
        btn.textContent = "Показать полностью…";
      } else {
        text.style.maxHeight = text.scrollHeight + "px";
        text.classList.add("appmonisensa-expanded");
        btn.textContent = "Скрыть описание";
      }
    });
    window.addEventListener("resize", () => {
      if (text.classList.contains("appmonisensa-expanded")) {
        text.style.maxHeight = text.scrollHeight + "px";
      }
    });
  })();


  (function () {
    const items = document.querySelectorAll(".contacts__details-list li");
    if (!items.length) return;
    items.forEach(item => {
      const btn = item.querySelector(".copy-btn");
      const img = btn ? btn.querySelector("img") : null;
      const tooltip = btn ? btn.querySelector(".copy-btn-tooltip") : null;
      const value = item.querySelector("p");

      if (!value || !btn || !img || !tooltip) return;
      item.addEventListener("click", () => {
        const textToCopy = value.textContent.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          img.src = "./image/icon/ic-check-circle.svg";
          img.alt = "Скопировано";
          btn.classList.add("copied");
          setTimeout(() => {
            img.src = "./image/icon/ic-copy.svg";
            img.alt = "Скопировать";
            btn.classList.remove("copied");
          }, 1500);
        }).catch(err => {
          console.error("Ошибка копирования:", err);
        });
      });
    });
  })();




  (function () {
    const wrapper = document.querySelector(".search__form-wrapper");
    const input = wrapper ? wrapper.querySelector(".search__input") : null;
    const btn = wrapper ? wrapper.querySelector(".search__btn") : null;
    const closeBtn = wrapper ? wrapper.querySelector(".dropdow-form-close") : null;
    const resultList = wrapper ? wrapper.querySelector(".search__result-list") : null;

    if (!wrapper || !input || !btn) return;

    function updateBtnClass() {
      if (window.innerWidth < 768 && wrapper.classList.contains("search-active")) {
        btn.classList.remove("blue_element");
        btn.classList.add("light_btn");
      } else {
        btn.classList.add("blue_element");
        btn.classList.remove("light_btn");
      }
    }
    function updateBottom() {
      if (!resultList) return;
      if (resultList.scrollHeight <= resultList.clientHeight + 1) {
        wrapper.classList.remove("at-bottom");
        return;
      }
      const atBottom =
        resultList.scrollTop + resultList.clientHeight >= resultList.scrollHeight - 1;

      wrapper.classList.toggle("at-bottom", atBottom);
    }
    input.addEventListener("input", () => {
      if (input.value.trim().length > 0) {
        wrapper.classList.add("search-active");
      } else {
        wrapper.classList.remove("search-active");
      }
      updateBtnClass();
      updateBottom();
    });
    input.addEventListener("focus", () => {
      wrapper.classList.add("search-active");
      updateBtnClass();
      updateBottom();
    });
    input.addEventListener("change", () => {
      if (input.value.trim().length > 0) {
        wrapper.classList.add("search-active");
      }
      updateBtnClass();
      updateBottom();
    });
    wrapper.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 768) {
        wrapper.classList.remove("search-active");
        updateBtnClass();
      }
    });
    input.addEventListener("blur", () => {
      if (window.innerWidth < 768 && input.value.trim().length === 0) {
        wrapper.classList.remove("search-active");
        updateBtnClass();
      }
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        wrapper.classList.remove("search-active");
        updateBtnClass();
      });
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper.classList.add("search-active");
      updateBtnClass();
      updateBottom();
    });

    if (resultList) {
      resultList.addEventListener("scroll", updateBottom, { passive: true });
      window.addEventListener("resize", updateBottom);
    }
    updateBtnClass();
    updateBottom();
  })();


  (function () {
    const dropdownBtn = document.querySelector('.help_sidebar-open');
    const sideBar = document.querySelector('.help_archive-sidebar');
    const closeDropBtn = document.querySelector('.dropdow-help-close');

    function closeMenu() {
      document.body.classList.remove('help-active');
    }

    if (dropdownBtn) {
      dropdownBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          document.body.classList.toggle('help-active');
        }
      });
    }

    if (closeDropBtn) {
      closeDropBtn.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', (e) => {
      if (
        document.body.classList.contains('help-active') &&
        sideBar &&
        !sideBar.contains(e.target) &&
        dropdownBtn &&
        !dropdownBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  })();



  (function () {
    const productThumbs = new Swiper('.product__thumbs', {
      direction: 'vertical',
      spaceBetween: 4,
      slidesPerView: 4,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          direction: 'horizontal',
          slidesPerView: 'auto',
        },
        1050: {
          direction: 'vertical',
          slidesPerView: 5,
        },
      },
    });

    const productMain = new Swiper('.product__main', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.product_button-next',
        prevEl: '.product_button-prev',
      },
      thumbs: {
        swiper: productThumbs,
      },
    });
  })();


  (function () {
    const popup = document.getElementById("productPopup");
    if (!popup) return;
    const content = popup.querySelector(".product_popup-content");
    const closeBtn = popup.querySelector(".product_popup-close");
    const popupWrapper = popup.querySelector(".swiper-wrapper");
    document.querySelectorAll(".product__main .swiper-slide").forEach(slide => {
      popupWrapper.appendChild(slide.cloneNode(true));
    });
    const popupSwiper = new Swiper(".product_popup-slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: false,
      navigation: {
        nextEl: '.product_button-next',
        prevEl: '.product_button-prev',
      }
    });
    document.querySelectorAll(".product__main .swiper-slide img").forEach((img, index) => {
      img.addEventListener("click", () => {
        popup.classList.add("product-popup-active");
        popupSwiper.slideTo(index, 0);
      });
    });
    function closePopup() {
      popup.classList.remove("product-popup-active");
    }
    if (closeBtn) closeBtn.addEventListener("click", closePopup);
    popupWrapper.addEventListener("click", (e) => {
      if (!e.target.closest("img")) {
        closePopup();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  })();





  (function () {
    const wrap = document.querySelector(".product_excerpt-wrap");
    const btn = document.querySelector(".product_excerpt-toggle");

    if (wrap && btn) {
      btn.addEventListener("click", () => {
        wrap.classList.toggle("product-open");

        if (wrap.classList.contains("product-open")) {
          btn.textContent = "Скрыть описание";
        } else {
          btn.textContent = "Показать полностью";
        }
      });
    }
  })();






});
