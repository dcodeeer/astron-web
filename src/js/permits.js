document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.slider-container', {
    init: false,
    speed: 500,
    autoplay: {
      delay: 2000,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
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
});