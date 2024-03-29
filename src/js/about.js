document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#slider', {
    slidesPerView: 1,
    breakpoints: {
      720: {
        slidesPerView: 'auto',
      }
    },
    spaceBetween: 4,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev'
    },
  });

  ScrollTrigger.create({
    trigger: ".form-box",
    start: "-200px top",
    endTrigger: document.querySelector('aside'),
    end: "bottom bottom",
    pin: ".form-box"
  });



  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');

  const closeModalListener = (e) => {
    modal.classList.remove('show');
    body.style.overflowY = 'visible';
    modal.removeEventListener('click', closeModalListener);
  };
  const openModalListener = (e) => {
    modal.classList.add('show');

    const icon = e.currentTarget.querySelector('svg');
    
    const logo = modal.querySelector('.logo');
    
    logo.innerHTML = '';
    logo.append(icon.cloneNode(true));
    body.style.overflowY = 'hidden';

    modal.querySelector('.close-modal').addEventListener('click', closeModalListener)
  };

  const blocks = document.querySelectorAll('.open-modal');
  blocks.forEach((block) => block.addEventListener('click', openModalListener));
  
});