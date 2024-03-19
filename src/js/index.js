document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.pdf-modal');

  const closeModal = (e) => {
    modal.classList.remove('show');
    modal.removeEventListener('click', closeModal);
    document.querySelector('body').style.overflowY = 'visible';
  };

  const openModal = (e) => {
    modal.classList.add('show');
    const url = e.currentTarget.getAttribute('data-value');
    console.log(url)
    modal.querySelector('embed').src = url;

    document.querySelector('body').style.overflowY = 'hidden';
    modal.addEventListener('click', closeModal);
  };

  document.querySelectorAll('.fifth .item .name').forEach((btn) => btn.addEventListener('click', openModal))


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

  const openDropdownButton = document.querySelector('.open-dropdown');
  const openDropdownListener = (e) => {
    console.log('opend')
    const target = e.currentTarget;
    const dropdown = e.currentTarget.parentNode.querySelector('.dropdown');
    dropdown.classList.remove('hidden');
    dropdown.classList.add('show');

    target.classList.add('hidden');

    dropdownCloseListener = (e) => {
      target.classList.remove('hidden');
      dropdown.classList.add('hidden');
      dropdown.removeEventListener('close', dropdownCloseListener);
    }
    dropdown.addEventListener('close', dropdownCloseListener);
  };

  openDropdownButton.addEventListener('click', openDropdownListener);


  // animation
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)

  ScrollTrigger.create({
    trigger: ".left-brick",
    start: "-100px top", 
    end: "bottom 300px",
    pin: ".left-brick"
  });

  ScrollTrigger.create({
    trigger: ".right-brick",
    start: "-100px top", 
    end: "bottom 300px",
    pin: ".right-brick"
  });

  ScrollTrigger.create({
    trigger: ".sixth-right-brick",
    start: "-200px top", 
    end: "bottom 300px",
    pin: ".sixth-right-brick"
  });

  // gsap.fromTo(
  //   'header',
  //   { y: -100, opacity: 0 },
  //   { y: 0, opacity: 1, delay: 0.5 });

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
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fourth.trigger },
  );

  gsap.fromTo(
    '.index-page .fourth .container .right .box',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fourth.trigger },
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
    `.index-page .fifth .left .title .text`,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
  );
  for (let i = 0; i < 3; i++) {
    let className = 'item-first';

    if (i == 1) {
      className = 'item-second';
    } else if (i == 2) {
      className = 'item-third';
    } else if (i == 3) {
      className = 'item-fourth';
    }

    gsap.fromTo(
      `.index-page .fifth .left .list .${className} .top`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
    gsap.fromTo(
      `.index-page .fifth .left .list .${className} .H1`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
    gsap.fromTo(
      `.index-page .fifth .left .list .${className} .body-3`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
  }

  gsap.fromTo(
    `.index-page .fifth .right .title .text`,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
  );

  for (let i = 0; i < 3; i++) {
    let className = 'item-first';

    if (i == 1) {
      className = 'item-second';
    } else if (i == 2) {
      className = 'item-third';
    } else if (i == 3) {
      className = 'item-fourth';
    }

    gsap.fromTo(
      `.index-page .fifth .right .list .${className} .top`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
    gsap.fromTo(
      `.index-page .fifth .right .list .${className} .H1`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
    gsap.fromTo(
      `.index-page .fifth .right .list .${className} .body-3`,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, scrollTrigger: fifth.trigger },
    );
  }


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
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: sixth.trigger },
  );

  gsap.fromTo(
    '.index-page .sixth .container .right',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, delay: 0.5, scrollTrigger: sixth.trigger },
  );
  
  

});