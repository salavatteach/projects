
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

// Проверяем, есть ли на странице хотя бы один элемент из калькулятора
function isHomePage() {
  return document.getElementById('totalPrice') !== null;
}

// Универсальная функция обновления шкалы и значения
function updateSliderUI(sliderEl, labelEl, suffix = '') {
  const val = +sliderEl.value;
  const min = +sliderEl.min;
  const max = +sliderEl.max;
  const percent = ((val - min) / (max - min)) * 100;

  labelEl.textContent = `${val}${suffix}`;
  sliderEl.style.background =
    `linear-gradient(to right, #A50301 ${percent}%, black ${percent}%),
    repeating-linear-gradient(to right, #A50301 0 3px, transparent 3px 74.3px)`;
}

// Функция для обновления всех слайдеров и цены
function updateValues() {
  for (const key in sliders) {
    const { slider, label, suffix } = sliders[key];
    const sliderEl = document.getElementById(slider);
    const labelEl = document.getElementById(label);
    if (sliderEl && labelEl) {
      updateSliderUI(sliderEl, labelEl, suffix);
    }
  }

  // Проверяем наличие элементов перед расчётом стоимости
  const daysSlider = document.getElementById('daysSlider');
  const visitorsSlider = document.getElementById('visitorsSlider');
  const totalPrice = document.getElementById('totalPrice');
  const smoothTraffic = document.getElementById('smoothTraffic');
  const useAI = document.getElementById('useAI');
  const yandexReg = document.getElementById('yandexReg');

  if (daysSlider && visitorsSlider && totalPrice) {
    // Расчёт стоимости
    const base =
      +daysSlider.value *
      +visitorsSlider.value *
      pricePerVisitor;

    let total = base;
    if (smoothTraffic && smoothTraffic.checked) total += 500;
    if (useAI && useAI.checked) total += 800;
    if (yandexReg && yandexReg.checked) total += 300;

    totalPrice.textContent = total.toLocaleString('ru-RU');
  }
}

// Инициализация только если это главная страница
if (isHomePage()) {
  // Навешиваем события на все слайдеры и чекбоксы
  const elements = [
    ...Object.values(sliders).map(s => document.getElementById(s.slider)),
    document.getElementById('smoothTraffic'),
    document.getElementById('useAI'),
    document.getElementById('yandexReg')
  ].filter(el => el !== null); // Фильтруем null элементы

  elements.forEach(el => el.addEventListener('input', updateValues));

  // Начальная инициализация
  updateValues();
}

/*****************регион продвижения************** */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('regionToggle');
  const list = document.getElementById('regionList');
  const label = document.getElementById('regionLabel');
  const items = document.querySelectorAll('.region-accordion__item');

  // Проверяем, есть ли все необходимые элементы (аккордеон существует)
  if (toggleBtn && list && label && items.length > 0) {
    // Открытие/закрытие аккордеона
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
  }
});



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

/**************************************проеверка форма*************************** */
document.addEventListener('DOMContentLoaded', () => {
  const keywordsInput = document.getElementById('keywords');
  const form = document.getElementById('checkForm');
  const wordCountElem = document.getElementById('wordCount');
  const resultsBody = document.getElementById('resultsBody');
  const totalCount = document.getElementById('totalCount');
  const top5Count = document.getElementById('top5Count');
  const top10Count = document.getElementById('top10Count');
  const top20Count = document.getElementById('top20Count');
  const top50Count = document.getElementById('top50Count');

  // Проверяем, есть ли нужные элементы
  if (!keywordsInput || !form || !wordCountElem) {
    // Если ключевых элементов нет, просто выходим, чтобы избежать ошибок
    return;
  }

  // Подсчет количества ключевых слов
  keywordsInput.addEventListener('input', () => {
    const text = keywordsInput.value.trim();
    if (!text) {
      wordCountElem.textContent = 0;
      return;
    }

    const words = text
      .split('\n')
      .flatMap(line => line.trim().split(/\s+/))
      .filter(w => w.length > 0);

    wordCountElem.textContent = words.length;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Проверяем, что результаты и счетчики есть, чтобы не получить ошибку
    if (!resultsBody || !totalCount || !top5Count || !top10Count || !top20Count || !top50Count) {
      alert('Не найдены элементы для вывода результатов');
      return;
    }

    const keywords = keywordsInput.value
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (keywords.length === 0) {
      alert('Введите хотя бы одно ключевое слово');
      return;
    }

    resultsBody.innerHTML = '';

    const fakeResults = keywords.map(word => ({
      query: word,
      position: Math.floor(Math.random() * 100) + 1,
      url: `https://example.com/${word.replace(/\s+/g, '-')}`
    }));

    let countTotal = fakeResults.length;
    let countTop5 = fakeResults.filter(r => r.position <= 5).length;
    let countTop10 = fakeResults.filter(r => r.position <= 10).length;
    let countTop20 = fakeResults.filter(r => r.position <= 20).length;
    let countTop50 = fakeResults.filter(r => r.position <= 50).length;

    totalCount.textContent = countTotal;
    top5Count.textContent = countTop5;
    top10Count.textContent = countTop10;
    top20Count.textContent = countTop20;
    top50Count.textContent = countTop50;

    for (const res of fakeResults) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${res.query}</td>
        <td>${res.position}</td>
        <td><a href="${res.url}" target="_blank">${res.url}</a></td>
      `;
      resultsBody.appendChild(tr);
    }
  });
});

/**********************************************/

document.addEventListener('DOMContentLoaded', () => {

  const regions = [
    "Москва","Санкт-Петербург","Новосибирск","Екатеринбург","Казань",
    "Нижний Новгород","Челябинск","Самара","Ростов-на-Дону","Уфа",
    "Красноярск","Пермь","Воронеж","Волгоград","Россия","СНГ"
  ];

  // -------------------- СЕЛЕКТЫ --------------------
  const selects = [
    { toggleId: 'regionToggle1', listId: 'regionList1', labelId: 'regionLabel1' },
    { toggleId: 'regionToggle2', listId: 'regionList2', labelId: 'regionLabel2' },
    { toggleId: 'regionToggle3', listId: 'regionList3', labelId: 'regionLabel3' }
  ];

  selects.forEach((select) => {
    const toggleBtn = document.getElementById(select.toggleId);
    const list = document.getElementById(select.listId);
    const label = document.getElementById(select.labelId);
    if (!toggleBtn || !list || !label) return;

    // для item_city будем отдельно фильтр ставить, чтобы не мешать обычным селектам
    const isCity = list.classList.contains('item_city');
    let items = list.querySelectorAll('.region-exam__item');

    // --- Toggle ---
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      list.classList.toggle('active');
      // если это input города — ставим фокус
      if (isCity) {
        const input = list.closest('.region-exam_inner').querySelector('#regionSearch');
        if (input) setTimeout(()=> input.focus(), 0);
      }
    });

    // --- Выбор элемента (обычные селекты) ---
    if (!isCity) {
      items.forEach((item) => {
        item.addEventListener('click', () => {
          label.textContent = item.dataset.value || item.textContent;
          list.classList.remove('active');
        });
      });
    }
  });

  // -------------------- ФИЛЬТР ГОРОДОВ --------------------
  const cityContainer = document.querySelector('.region-exam_inner');
  if (cityContainer) {
    const input = cityContainer.querySelector('#regionSearch');
    const listWrap = cityContainer.querySelector('#regionList1');
    const listInner = listWrap.querySelector('.region-list-inner');

    // рендер
    function renderList(items) {
      listInner.innerHTML = items.length
        ? items.map(r => `<div class="region-exam__item" data-value="${r}">${r}</div>`).join('')
        : `<div class="region-exam__item" style="opacity:.6;">Ничего не найдено</div>`;
    }

    // показать первые 5
    function showDefault() {
      renderList(regions.slice(0,5));
      listWrap.classList.add('active');
    }

    function hideList() {
      listWrap.classList.remove('active');
    }

    input.addEventListener('focus', (e) => {
      e.stopPropagation();
      showDefault();
    });

    input.addEventListener('click', e => e.stopPropagation());

    // фильтр
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const filtered = regions.filter(r => r.toLowerCase().includes(q));
      renderList(filtered.slice(0,50));
      listWrap.classList.add('active');
    });

    // выбор города
    listInner.addEventListener('click', (e) => {
      const item = e.target.closest('.region-exam__item');
      if (!item) return;
      input.value = item.dataset.value;
      input.classList.add('region-selected');
      hideList();
    });

    // -------------------- ГЛОБАЛЬНОЕ ЗАКРЫТИЕ --------------------
    document.addEventListener('click', (e) => {
      // закрываем список только если клик не внутри города или других селектов
      if (!cityContainer.contains(e.target)) hideList();

      selects.forEach(sel => {
        const selList = document.getElementById(sel.listId);
        const selWrapper = selList.closest('.region-exam__wrapper');
        if (!selWrapper.contains(e.target) && !selList.classList.contains('item_city')) {
          selList.classList.remove('active');
        }
      });
    });

    // Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideList();
    });

    // инициализация
    renderList(regions.slice(0,5));
  }

  // -------------------- RADIO --------------------
  document.querySelectorAll('.radio-switch input').forEach(radio => {
    radio.addEventListener('change', function () {
      console.log('Выбрано:', this.value);
    });
  });

});
