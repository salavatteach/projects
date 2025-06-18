
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burger');
  const navInner = document.querySelector('.nav_inner');
  const body = document.body;

  function toggleMenu() {
    navInner.classList.toggle('active');
    body.classList.toggle('menu-open');
  }

  // Клик по бургеру
  burgerBtn.addEventListener('click', toggleMenu);

  // Клик по ссылке в меню — закрывает
  document.querySelectorAll('.nav_list-link').forEach(link => {
    link.addEventListener('click', () => {
      navInner.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
});

/************************авторизация************ */

document.addEventListener('DOMContentLoaded', () => {
  const modalAuth = document.querySelector('.sign_up-modal');
  const openBtns = document.querySelectorAll('.open_sign-up');
  const closeBtnAuth = document.querySelector('.sign_up-cancel');
  const modalBodyAuth = document.querySelector('.sign_up-body');

  // Открытие
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalAuth.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрытие по кнопке
  closeBtnAuth.addEventListener('click', (e) => {
    e.preventDefault();
    modalAuth.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Закрытие по клику вне блока
  modalAuth.addEventListener('click', (e) => {
    if (!modalBodyAuth.contains(e.target)) {
      modalAuth.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
/*********************регистрация********************* */

document.addEventListener('DOMContentLoaded', () => {
  const modalRegist = document.querySelector('.regist-modal');
  const openBtnsRegist = document.querySelectorAll('.open_regist');
  const closeBtnRegist = document.querySelector('.regist-cancel');
  const modalBodyRegist = document.querySelector('.regist-body');

  // Открытие
  openBtnsRegist.forEach(btn => {
    btn.addEventListener('click', () => {
      modalRegist.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрытие по кнопке
  closeBtnRegist.addEventListener('click', (e) => {
    e.preventDefault();
    modalRegist.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Закрытие по клику вне блока
  modalRegist.addEventListener('click', (e) => {
    if (!modalBodyRegist.contains(e.target)) {
      modalRegist.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

/*************************форма********* */

const pricePerVisitor = 0.4;

const sliders = {
  days: { slider: 'daysSlider', label: 'daysVal', suffix: ' дней' },
  mobile: { slider: 'mobileSlider', label: 'sliderValue', suffix: '%' },
  visitors: { slider: 'visitorsSlider', label: 'visitorsVal', suffix: '' },
  time: { slider: 'timeSlider', label: 'timeVal', suffix: ' мин.' },
  depth: { slider: 'depthSlider', label: 'depthVal', suffix: ' стр.' },
};

const totalPrice = document.getElementById('totalPrice');
const smoothTraffic = document.getElementById('smoothTraffic');
const useAI = document.getElementById('useAI');
const yandexReg = document.getElementById('yandexReg');

// Универсальная функция обновления шкалы и значения
function updateSliderUI(sliderEl, labelEl, suffix = '') {
  const val = +sliderEl.value;
  const min = +sliderEl.min;
  const max = +sliderEl.max;
  const percent = ((val - min) / (max - min)) * 100;

  labelEl.textContent = `${val}${suffix}`;
  sliderEl.style.background = `
    linear-gradient(to right, #A50301 ${percent}%, black ${percent}%),
    repeating-linear-gradient(to right, #A50301 0 3px, transparent 3px 74.3px)
  `;
}

// Функция для обновления всех слайдеров и цены
function updateValues() {
  for (const key in sliders) {
    const { slider, label, suffix } = sliders[key];
    const sliderEl = document.getElementById(slider);
    const labelEl = document.getElementById(label);
    updateSliderUI(sliderEl, labelEl, suffix);
  }

  // Расчёт стоимости
  const base =
    +document.getElementById('daysSlider').value *
    +document.getElementById('visitorsSlider').value *
    pricePerVisitor;

  let total = base;
  if (smoothTraffic.checked) total += 500;
  if (useAI.checked) total += 800;
  if (yandexReg.checked) total += 300;

  totalPrice.textContent = total.toLocaleString('ru-RU');
}

// Навешиваем события на все слайдеры и чекбоксы
[
  ...Object.values(sliders).map(s => document.getElementById(s.slider)),
  smoothTraffic, useAI, yandexReg
].forEach(el => el.addEventListener('input', updateValues));

// Начальная инициализация
updateValues();

/*****************регион продвижения************** */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('regionToggle');
  const list = document.getElementById('regionList');
  const label = document.getElementById('regionLabel');
  const items = document.querySelectorAll('.region-accordion__item');

  // Открытие/закрытие аккордиона
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    list.classList.toggle('active');
  });

  // Выбор региона
  items.forEach(item => {
    item.addEventListener('click', () => {
      const value = item.dataset.value;
      label.textContent = `${value}`;
      list.classList.remove('active');
    });
  });

  // Клик вне области — закрыть
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.region-accordion__wrapper')) {
      list.classList.remove('active');
    }
  });
});

/******************************************** */
// function initTimePicker(wrapperId, from = 7, to = 19) {
//   const wrapper = document.getElementById(wrapperId);
//   const input = wrapper.querySelector('input');
//   const optionsBox = wrapper.querySelector('.time-options');

//   // Генерируем список времени
//   for (let hour = from; hour <= to; hour++) {
//     const option = document.createElement('div');
//     option.className = 'time-option';
//     option.textContent = `${hour.toString().padStart(2, '0')}:00`;
//     option.dataset.value = `${hour.toString().padStart(2, '0')}:00`;
//     optionsBox.appendChild(option);
//   }

//   // Открытие при клике
//   input.addEventListener('click', () => {
//     wrapper.classList.toggle('open');
//   });

//   // Выбор времени
//   optionsBox.addEventListener('click', (e) => {
//     if (e.target.classList.contains('time-option')) {
//       input.value = e.target.dataset.value;
//       wrapper.classList.remove('open');
//     }
//   });

//   // Клик вне — закрыть
//   document.addEventListener('click', (e) => {
//     if (!wrapper.contains(e.target)) {
//       wrapper.classList.remove('open');
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   initTimePicker('customTimeTo'); // можно также initTimePicker('customTimeFrom') если второй блок
// });

/***********************аккордеон************************** */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq_accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.faq_accordion-header');

    header.addEventListener('click', (e) => {
      e.preventDefault(); // <--- важно для <a href="#">, чтобы не прыгала страница

      const isOpen = item.classList.contains('faq_accordion--active');

      // Закрыть все
      items.forEach(i => i.classList.remove('faq_accordion--active'));

      // Открыть текущий
      if (!isOpen) {
        item.classList.add('faq_accordion--active');
      }
    });
  });
});