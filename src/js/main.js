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

    clearInterval(modalTimerId);
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

  const modalTimerId = setTimeout(showModal, 10000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
});