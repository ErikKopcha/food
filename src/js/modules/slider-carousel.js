function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;

  // чтобы знать отступ справа или слева
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = `${slides.length}`;
    current.textContent = slideIndex;
  }

  // устанавливаем ширину wrapper, чтобы помещались все слайдеры
  slidesField.style.width = 100 * slides.length + `%`;
  slidesField.style.display = `flex`;
  slidesField.style.transition = `all 0.4s ease`;

  // скрываем слайды
  slidesWrapper.style.overflow = `hidden`;

  // устанавливаем ширину враппера для всех слайдов
  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = `relative`;

  // dots
  const dots = document.createElement('ol'),
    dotsArr = [];
  dots.classList.add('carousel-dots');
  dots.style.cssText = `
 position: absolute;
 right: 0;
 bottom: 0;
 left: 0;
 z-index: 15;
 display: flex;
 justify-content: center;
 margin-right: 15%;
 margin-left: 15%;
 list-style: none;
`;

  slider.appendChild(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
     box-sizing: content-box;
     flex: 0 1 auto;
     width: 30px;
     height: 6px;
     margin-right: 3px;
     margin-left: 3px;
     cursor: pointer;
     background-color: #fff;
     background-clip: padding-box;
     border-top: 10px solid transparent;
     border-bottom: 10px solid transparent;
     opacity: .5;
     transition: opacity .6s ease;
 `;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    dots.appendChild(dot);
    dotsArr.push(dot);
  }

  next.addEventListener('click', () => {
    // если отступ будет равен ширине одного слайда * количество слайдов - 1, то обнуляем
    // replace(/\D/g, '') - видаляємо все крім чисел \\ .slice(0, width.length - 2)
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dotsArr.forEach(dot => dot.style.opacity = `0.5`);
    dotsArr[slideIndex - 1].style.opacity = `1`;
  });

  prev.addEventListener('click', () => {
    // если отступ будет равен ширине одного слайда * количество слайдов - 1, то обнуляем
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1)
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dotsArr.forEach(dot => dot.style.opacity = `0.5`);
    dotsArr[slideIndex - 1].style.opacity = `1`;
  });

  dotsArr.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dotsArr.forEach(dot => dot.style.opacity = `0.5`);
      dotsArr[slideIndex - 1].style.opacity = `1`;
    });
  });

  // slider basic
  //   const slides = document.querySelectorAll('.offer__slide'),
  //       prev = document.querySelector('.offer__slider-prev'),
  //       next = document.querySelector('.offer__slider-next'),
  //       total = document.querySelector('#total'),
  //       current = document.querySelector('#current');
  //
  //   let slideIndex = 1;
  //
  //   showSlides(slideIndex);
  //
  //   if (slides.length < 10) {
  //       total.textContent = `0${slides.length}`;
  //   } else {
  //       total.textContent = `${slides.length}`;
  //   }
  //
  //   function showSlides(n) {
  //       // n = slideIndex
  //
  //       // +
  //       if (n > slides.length) {
  //           slideIndex = 1;
  //       }
  //
  //       // -
  //       if (n < 1) {
  //          slideIndex = slides.length
  //       }
  //
  //       slides.forEach(item => item.style.display = `none`);
  //
  //       slides[slideIndex - 1].style.display = `block`;
  //
  //       if (slides.length < 10) {
  //           current.textContent = `0${slideIndex}`;
  //       } else {
  //           current.textContent = slideIndex;
  //       }
  //   }
  //
  //   function plusSlides(n) {
  //       showSlides(slideIndex += n);
  //   }
  //
  //   prev.addEventListener('click', () => {
  //      plusSlides(-1);
  //   });
  //
  //   next.addEventListener('click', () => {
  //       plusSlides(1);
  //   });
}

export default slider;