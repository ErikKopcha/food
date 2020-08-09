window.addEventListener('DOMContentLoaded', () => {
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
});