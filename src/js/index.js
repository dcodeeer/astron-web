document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.pdf-modal');

  const closeModal = (e) => {
    console.log(e.target)
    modal.classList.remove('show');
    modal.removeEventListener('click', closeModal);
    document.querySelector('body').style.overflowY = 'visible';
  };

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

  const openModal = (path) => {
    var canvas = document.getElementById('pdf-embed');

    pdfjsLib.getDocument(path).promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var viewport = page.getViewport({ scale: 1.0 });
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport: viewport });
      });
    });
    
    modal.classList.add('show');

    document.querySelector('body').style.overflowY = 'hidden';
    modal.addEventListener('click', closeModal);
  };

  document.querySelectorAll('.fifth .item .name').forEach((btn) => btn.addEventListener('click', (e) => {
    openModal(e.currentTarget.getAttribute('data-value'));
  }));


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

  const data = JSON.parse('{"exac":[{"title":"the title","count":"2","left_title":"Техническое Описание","left_list":[{"key":"value"}],"left_images":["asda","asdsad"],"right_title":"Техническое Описание","right_list":[{"key":"value"}],"right_images":["asda","asdsad"]}],"exac_2":[{"title":"the title 2","count":"2","left_title":"Техническое Описание","left_list":[{"key":"value"}],"left_images":["asda","asdsad"],"right_title":"Техническое Описание","right_list":[{"key":"value"}],"right_images":["asda","asdsad"]}]}');

  document.querySelectorAll('.tab').forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      swiper2.slideTo(index);
      const category = e.currentTarget.getAttribute('data-category-slag');
      const list = data[category];

      if (list) {
        let html = '';
        list.forEach((item, index) => {
          item.category = category;
          item.index = index;
          html += createSlideFromList(item);
        });
        const swiperWrapper = document.querySelector('.third .slider-container .swiper-wrapper');
        swiperWrapper.innerHTML = html;
        swiper.update();
        swiper.updateSize();
        const blocks = document.querySelectorAll('.slide-open-modal');
        blocks.forEach(block => block.addEventListener('click', modalOpenListener));
      }
    })
  });

  const createSlideFromList = ({ index, title, preview, isNew, count, category }) => {
    let output =  `
      <div class='swiper-slide slide-open-modal' data-id='${index}' data-category-slag='${category}'>
            <div class='image'>`;

            if (isNew) {
              output += `<div class='new body-1'>NEW ARRIVING</div>`;
            }

    output +=`<img src='${preview}' />
            </div>
            <div class='info'>
              <div class='left'>
                <div class='H1'>${title}</div>
                <div class='body-3-sarala'></div>
              </div>
              <div class='right'>
                <div class='count'>
                  <div class='number'>${count}</div>
                  <div class='text body-4'>одиниці</div>
                </div>
                <div class='icon'>
                  <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.25 9.5H21.75M21.75 9.5L14.25 2M21.75 9.5L14.25 17" stroke="currentColor" stroke-width="3"/>
                    </svg>
                    
                </div>
              </div>
            </div>
          </div>`;

    return output;
  };

  const modalSlider = new Swiper('#modal-slider', {
    init: false,
    effect: 'fade',
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: '#modal-prev',
      nextEl: '#modal-next'
    },
  });

  // tab

  modalSlider.on('slideChange', (swiper) => {
    const slider = document.querySelector('.slider-right');
    const slides = slider.querySelectorAll('img');
    if (swiper.realIndex < swiper.previousIndex) {
      slider.insertBefore(slides[slides.length - 1], slider.firstChild);
      return;
    }
    slider.appendChild(slides[0]);
  });
  

  const slides = document.querySelector('.tab-slides[data-id="1"]');
  document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
  modalSlider.init();

  const tabOpenListener = (e) => {
    document.querySelectorAll('.tab-title').forEach((tabTitle) => tabTitle.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const id = e.currentTarget.getAttribute('data-id');

    const slides = document.querySelector(".tab-slides[data-id='"+ id +"']");
    document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
    modalSlider.update();

    const content = document.querySelector(".tab-content[data-id='"+ id +"']");

    const currentVisible = document.querySelector(".tab-content.visible");
    currentVisible.classList.remove('visible');
    content.classList.add('visible');
    
    const images = slides.querySelectorAll('img');
    const sliderRight = document.querySelector('.slider-right');

    sliderRight.innerHTML = '';

    images.forEach((img) => {
      sliderRight.appendChild(img.cloneNode());
    });
  };


  const tabs = document.querySelectorAll('.tab-title');
  tabs.forEach((tab) => tab.addEventListener('click', tabOpenListener));

  // tab


  // modal

  const modalOpenListener = (e) => {
    const body = document.querySelector('body');

    const modal = document.querySelector('.modal');
    modal.classList.add('opened');
    body.style.overflowY = 'hidden';

    const category = e.currentTarget.getAttribute('data-category-slag');
    const id = e.currentTarget.getAttribute('data-id');
    const item = data[category][id];


    modal.querySelector('[data-name="preview_mini"]').innerHTML = item.preview_mini;
    modal.querySelector('[data-name="title"]').innerHTML = item.title;
    modal.querySelector('[data-name="left_title"]').innerHTML = item.left_title;
    modal.querySelector('[data-name="right_title"]').innerHTML = item.right_title;
    modal.querySelector('[data-name="count"]').innerHTML = item.count;

    const left_slider = modal.querySelector('[data-name="left_slider"]');
    item['left_images'].forEach((image) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      const img = document.createElement('img');
      img.src = image;
      slide.append(img);
      left_slider.innerHTML = '';
      left_slider.append(slide);
    });

    const right_slider = modal.querySelector('[data-name="right_slider"]');
    item['right_images'].forEach((image) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      const img = document.createElement('img');
      img.src = image;
      slide.append(img);
      right_slider.innerHTML = '';
      right_slider.append(slide);
    });

    const left_list = modal.querySelector('[data-name="left_list"]');
    const right_list = modal.querySelector('[data-name="right_list"]');
    
    item['left_list'].forEach((value) => {
      Object.entries(value).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.classList.add('row', 'body-3-sarala');
  
        const keyElem = document.createElement('div');
        keyElem.classList.add('key');
        keyElem.innerHTML = key;
        div.append(keyElem);
  
        const valueElem = document.createElement('div');
        valueElem.classList.add('value');
        valueElem.innerHTML = value;
        div.append(valueElem);
  
        left_list.innerHTML = '';
        left_list.append(div);
      });
    });

    item['right_list'].forEach((value) => {
      Object.entries(value).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.classList.add('row', 'body-3-sarala');
  
        const keyElem = document.createElement('div');
        keyElem.classList.add('key');
        keyElem.innerHTML = key;
        div.append(keyElem);
  
        const valueElem = document.createElement('div');
        valueElem.classList.add('value');
        valueElem.innerHTML = value;
        div.append(valueElem);
  
        right_list.innerHTML = '';
        right_list.append(div);
      });
    });

    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.remove('opened')
      body.style.overflowY = 'visible';
    });
  };

  const blocks = document.querySelectorAll('.slide-open-modal');
  blocks.forEach(block => block.addEventListener('click', modalOpenListener))
  // modal

  const openDropdownButton = document.querySelector('.open-dropdown');
  const openDropdownListener = (e) => {
    const target = e.currentTarget;
    const dropdown = e.currentTarget.parentNode.querySelector('.dropdown');

    e.stopImmediatePropagation();
    dropdown.dispatchEvent(new Event('click'));
    
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
  
  document.getElementById('pdf-value').addEventListener('change', (e) => {
    openModal(e.currentTarget.value);
  });


  // animation

  document.getElementById('go-to-bottom').addEventListener('click', (e) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: '',
      scrollTo: { y: "#index-fourth", offsetY: 150 },
      ease: "Power1.easeInOut"
    });
  });

  const navScrollToListener = (e) => {
    if (e.currentTarget.tagName !== 'A') return;

    e.preventDefault();
    
    gsap.to(window, {
      duration: 1,
      scrollTo: '',
      scrollTo: { y: e.currentTarget.getAttribute('href'), offsetY: 150 },
      ease: "Power1.easeInOut"
    });
  };

  const navLinks = document.querySelectorAll('.nav-scroll-link');
  navLinks.forEach((navLink) => navLink.addEventListener('click', navScrollToListener));

  // paralax start
  
  

  // paralax end

  // ScrollTrigger.create({
  //   trigger: ".left-brick",
  //   start: "-100px top", 
  //   end: "bottom 300px",
  //   pin: ".left-brick"
  // });

  gsap.to('.left-brick', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: ".left-brick",
      start: "-100px top", 
      end: "bottom 300px",
      scrub: true
    }
  });

  gsap.to('.right-brick', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: ".right-brick",
      start: "-100px top", 
      end: "bottom 300px",
      scrub: true
    }
  });

  gsap.to('.sixth-right-brick', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: ".sixth-right-brick",
      start: "-400px top", 
      end: "bottom 300px",
      scrub: true
    }
  });

  gsap.to('.sixth-left-brick', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: ".sixth-left-brick",
      start: "-400px top", 
      end: "bottom 300px",
      scrub: true
    }
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