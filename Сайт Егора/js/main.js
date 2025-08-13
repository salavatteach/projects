
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu_btn');
    const dropdownShort = document.querySelector('.header_dropdown');
    const dropdown = document.querySelector('.header');

    if (!menuBtn || !dropdown) return;

    // Открытие/закрытие по кнопке
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('header-menu--active');
    });

    dropdownShort.addEventListener('click', (e) => {
        if (e.target.closest('.header_close')) {
            dropdown.classList.remove('header-menu--active');
        }
    });

    dropdown.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            dropdown.classList.remove('header-menu--active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!dropdownShort.contains(e.target) && !menuBtn.contains(e.target)) {
            dropdown.classList.remove('header-menu--active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('.cookie_wrapper');
    const cookieBtn = document.querySelector('.cookie_btn');

    if (!cookieBanner || !cookieBtn) return;

    // Показ через 1 секунду
    setTimeout(() => {
        cookieBanner.classList.add('cookie--show');
    }, 1000);

    // Скрытие по кнопке
    cookieBtn.addEventListener('click', () => {
        cookieBanner.classList.add('cookie--hide');

        cookieBanner.addEventListener('transitionend', () => {
            cookieBanner.style.display = 'none';
        }, { once: true });
    });
});

new Swiper('.works_slider', {
    slidesPerView: 1.15,
    spaceBetween: 15,
    slidesPerGroup: 1,
    mousewheel: {
        enabled: true,
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
        eventsTarget: '.works_slider'
    },
    freeMode: {
        enabled: true,
        momentum: true,
        sticky: false
    },


    navigation: {
        nextEl: '.works__nav-next',
        prevEl: '.works__nav-prev',
    },

    breakpoints: {

        451: {
            slidesPerView: 1.35,

        },
        769: {
            slidesPerView: 2,

        },

    }

});



document.querySelectorAll('.ask_accord-item').forEach(item => {
    const tooltip = item.querySelector('.ask_accord-answer');
    tooltip.style.position = 'fixed';
    let isVisible = false;

    item.addEventListener('mousemove', e => {
        if (window.innerWidth <= 768) return;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        let x = e.clientX - 75;
        let y = e.clientY - tooltipHeight - 10;

        // левая граница
        if (x < 0) x = 0;
        // правая граница
        if (x + tooltipWidth > window.innerWidth) {
            x = window.innerWidth - tooltipWidth;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

        if (!isVisible) {
            tooltip.style.opacity = '1';
            isVisible = true;
        }
    });

    item.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) return;
        tooltip.style.opacity = '0';
        isVisible = false;
    });
});





document.addEventListener('click', e => {
    if (window.innerWidth >= 768) return; // только для мобилок

    const clickedItem = e.target.closest('.ask_accord-item');
    const clickedWrapper = e.target.closest('.ask_answer-wrapp');
    const isCloseBtn = e.target.closest('.answer_close');

    // Кнопка "Закрыть"
    if (isCloseBtn) {
        const item = e.target.closest('.ask_accord-item');
        if (item) item.classList.remove('open-answer');
        return;
    }

    // Клик по заголовку / аккордеону
    if (clickedItem && !clickedWrapper) {
        // Закрыть все открытые
        document.querySelectorAll('.ask_accord-item.open-answer').forEach(openItem => {
            if (openItem !== clickedItem) {
                openItem.classList.remove('open-answer');
            }
        });

        // Переключить текущий
        clickedItem.classList.toggle('open-answer');
        return;
    }

    // Клик вне любого аккордеона — закрыть все
    if (!clickedWrapper) {
        document.querySelectorAll('.ask_accord-item.open-answer')
            .forEach(openItem => openItem.classList.remove('open-answer'));
    }
});

document.addEventListener('click', e => {
    if (window.innerWidth >= 768) return;
    const clickedItem = e.target.closest('.service_body-price');
    const isInsideOferta = e.target.closest('.oferta_text-wrap');
    const isCloseBtn = e.target.closest('.oferta_close');
    if (isCloseBtn) {
        const item = e.target.closest('.service_body-price');
        if (item) item.classList.remove('open-oferta');
        return;
    }
    if (clickedItem && !isInsideOferta) {
        document.querySelectorAll('.service_body-price.open-oferta').forEach(openItem => {
            if (openItem !== clickedItem) openItem.classList.remove('open-oferta');
        });
        clickedItem.classList.toggle('open-oferta');
        return;
    }
    if (!isInsideOferta) {
        document.querySelectorAll('.service_body-price.open-oferta')
            .forEach(openItem => openItem.classList.remove('open-oferta'));
    }
});
