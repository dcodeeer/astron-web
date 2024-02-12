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
      1249: {
        spaceBetween: 15,
      },
      1250: {
        spaceBetween: 64,
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
    body.style.overflow = 'hidden';

    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.remove('modal-box-opened')
      body.style.overflow = 'visible';
    });
  };

  const blocks = document.querySelectorAll('.slide-open-modal');
  blocks.forEach(block => block.addEventListener('click', modalOpenListener))
  // modal
});