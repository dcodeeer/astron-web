document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.slider-container', {
    init: false,
    loop: true,
    speed: 500,
    autoplay: {
        delay: 2000,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: '-17%',
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },

    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
  });

  slider.on('slideChange', (swiper) => {
    document.querySelector('#current-slide').innerHTML = swiper.realIndex + 1;
  });

  slider.on('init', (swiper) => {
    document.querySelector('#slides-count').innerHTML = swiper.slides.length;
  });

  slider.init();


  // modal

  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');

  const closeModalListener = (e) => {
    modal.classList.remove('show');
    body.style.overflowY = 'visible';
    modal.removeEventListener('click', closeModalListener);
  };
  const openModalListener = (e) => {
    modal.classList.add('show');
    const img = modal.querySelector('img');
    img.src = e.currentTarget.src;

    body.style.overflowY = 'hidden';

    modal.addEventListener('click', closeModalListener)
  };

  const images = document.querySelectorAll('.open-modal');
  images.forEach((image) => image.addEventListener('click', openModalListener));
});