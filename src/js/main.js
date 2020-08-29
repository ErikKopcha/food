window.addEventListener('DOMContentLoaded', () => {

  // tabs

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsWrapper = document.querySelector('.tabheader__items');
  // скрываем табы
  function hideTabContent() {
    tabsContent.forEach(el => {
      el.style.display = `none`;
    });

    tabs.forEach(el => {
      el.classList.remove('tabheader__item_active');
    });
  }

  // показываем табы
  // если вызов без параметра, то присвоится - 0
  function showTabContent(i = 0) {
    tabsContent[i].style.display = `block`;
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent(0);

  tabsWrapper.addEventListener('click', (event) => {
    event.preventDefault();
    const theTarget = event.target;

    if (theTarget && theTarget.classList.contains('tabheader__item')) {
      tabs.forEach((el, i) => {
        console.log(el);
        if (theTarget == el) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // timer 

  const deadline = '2020-09-14';

  function getTimeRemainign(endtime) {
    // получаем дату из строки Date.parse, получаем разницу между датами в млл
    // операция, которая рассчитывает оставшиеся время от deadline
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // добавление нуля к числу  < 10
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemainign(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelectorAll('[data-close]');

  modalTrigger.forEach(el => {
    el.addEventListener('click', () => {
      showModal();
    });
  });

  modalCloseBtn.forEach(el => {
    el.addEventListener('click', () => {
      closeModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (typeof modalTimerId !== 'undefined') {
      clearInterval(modalTimerId);
    }
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  //const modalTimerId = setTimeout(showModal, 10000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, container, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 27;
      this.container = document.querySelector(container);

      this.init();
    }

    init() {
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(el => { element.classList.add(el); });
      }

      element.innerHTML = `
        <div class="menu__item">
            <img src="${this.src}" alt="${this.src}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span style='padding-right: 5px;'>${this.price}</span>грн/день</div>
            </div>
        </div>
      `;
      
      this.container.appendChild(element);
    }
  }

  let menuCard = new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    '"Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu__field .container',
    'menu__item',
    'big'
  ).render();

  let menuCardTwo = new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    '”Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu__field .container'
  ).render();

  let menuCardThree = new MenuCard(
    'img/tabs/post.jpg',
    'post',
    '"Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu__field .container'
  ).render();

  // forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так'
  };

  forms.forEach(el => {
    postData(el);
  });

  function postData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);

      const request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form);

      const object = {};

      formData.forEach(function(value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
