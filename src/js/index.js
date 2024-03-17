document.addEventListener('DOMContentLoaded', () => {
  // header
  document.addEventListener('scroll', (e) => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = '#0D0D0D';
    } else {
      header.style.background = 'transparent';
    }
  });
  // header end

  const swiper = new Swiper('.slider-container', {
    slidesPerView: "auto",
    spaceBetween: 4,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev'
    },
  });

  const swiper2 = new Swiper('#slider-tabs', {
    slidesPerView: "auto",
    navigation: {
      prevEl: '#tab-prev-btn',
      nextEl: '#tab-next-btn'
    },

    breakpoints: {
      1250: {
        spaceBetween: 10,
      },
    }
  });

   const modalSlider = new Swiper('#modal-slider', {
    init: false,
    slidesPerView: "auto",
    navigation: {
      prevEl: '#modal-prev',
      nextEl: '#modal-next'
    },

    breakpoints: {
      1249: {
        spaceBetween: 15,
      },
      1250: {
        spaceBetween: 64,
      },
    }
  });

  // tab

  const slides = document.querySelector('.tab-slides[data-id="1"]');
  document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
  modalSlider.init();

  const tabOpenListener = (e) => {
    document.querySelectorAll('.tab-title').forEach((tabTitle) => tabTitle.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const id = e.currentTarget.getAttribute('data-id');

    const slides = document.querySelector(".tab-slides[data-id='"+ id +"']");
    console.log(slides);
    document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
    modalSlider.update();

    const content = document.querySelector(".tab-content[data-id='"+ id +"']");

    const currentVisible = document.querySelector(".tab-content.visible");
    currentVisible.classList.remove('visible');
    content.classList.add('visible');
  };


  const tabs = document.querySelectorAll('.tab-title');
  tabs.forEach((tab) => tab.addEventListener('click', tabOpenListener));

  // tab


  // modal

  const modalOpenListener = () => {
    const body = document.querySelector('body');

    const modal = document.querySelector('.modal-box');
    modal.classList.add('modal-box-opened');
    body.style.overflowY = 'hidden';

    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.remove('modal-box-opened')
      body.style.overflowY = 'visible';
    });
  };

  const blocks = document.querySelectorAll('.slide-open-modal');
  blocks.forEach(block => block.addEventListener('click', modalOpenListener))
  // modal


  // animation
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)

  gsap.fromTo(
    'header',
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5 });

  // first
  gsap.fromTo(
    '.index-page .first .container',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5},
  );

  // second
  const second = {};
  second.trigger = {
    trigger: '.index-page .second',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };

  gsap.fromTo(
    '.index-page .second .container .top',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: second.trigger},
  );

  gsap.fromTo(
    '.index-page .second .container .list',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.8, scrollTrigger: second.trigger},
  );

  // third
  const third = {};
  third.trigger = {
    trigger: '.index-page .third .container',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };

  gsap.fromTo(
    '.index-page .third .container .mini-title',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: third.trigger},
  );

  gsap.fromTo(
    '.index-page .third .container .title',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: third.trigger},
  );
  gsap.fromTo(
    '.index-page .third .container .tabs',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: third.trigger},
  );
  
  gsap.fromTo(
    '.index-page .third .slider-container',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 1.25, scrollTrigger: third.trigger}
  );

  const fourth = {};
  fourth.trigger = {
    trigger: '.index-page .fourth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  
  gsap.fromTo(
    '.index-page .fourth .container .left .title',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5, scrollTrigger: fourth.trigger },
  );

  gsap.fromTo(
    '.index-page .fourth .container .right .box',
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5, scrollTrigger: fourth.trigger },
  );


  // fifth
  const fifth = {};
  fifth.trigger = {
    trigger: '.index-page .fifth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };

  gsap.fromTo(
    '.index-page .fifth',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
  );

  // sixth 
  const sixth = {};
  sixth.trigger = {
    trigger: '.index-page .sixth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };

  gsap.fromTo(
    '.index-page .sixth .container .left',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5, scrollTrigger: sixth.trigger },
  );

  gsap.fromTo(
    '.index-page .sixth .container .right',
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5, scrollTrigger: sixth.trigger },
  );

});