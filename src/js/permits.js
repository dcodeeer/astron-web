document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.slider-container', {
    init: false,
    effect: 'coverflow',
    loop: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: 3,
    loopedSlides: 4,
    spaceBetween: '-25%',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
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

  const modal = document.querySelector('.modal');

  const closeModalListener = (e) => {
    modal.classList.remove('show');
    modal.removeEventListener('click', closeModalListener);
  };
  const openModalListener = (e) => {
    modal.classList.add('show');
    const img = modal.querySelector('img');
    img.src = e.currentTarget.src;

    modal.addEventListener('click', closeModalListener)
  };

  const images = document.querySelectorAll('.open-modal');
  images.forEach((image) => image.addEventListener('click', openModalListener));
});