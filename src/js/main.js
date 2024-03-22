gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

gsap.to('.left-bottom-img', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: ".left-bottom-img",
    start: "-300px top", 
    end: "bottom 300px",
    scrub: true
  }
});

gsap.to('.right-top-img', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: ".right-top-img",
    start: "-100px top", 
    end: "bottom 300px",
    scrub: true
  }
});

gsap.to('.right-bottom-img', {
  yPercent: 10,
  ease: 'none',
  scrollTrigger: {
    trigger: ".right-top-img",
    start: "-100px top", 
    end: "bottom 300px",
    scrub: true
  }
});

const contactBox = {};
contactBox.trigger = {
  trigger: '.contact-us-box',
  start: '0px bottom',
  end: 'bottom top',
  toggleActions: "play pause resume reset"
};

gsap.fromTo(
  '.contact-us-box .container .title',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 0.5, scrollTrigger: contactBox.trigger },
);

gsap.fromTo(
  '.contact-us-box .container form',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 1, scrollTrigger: contactBox.trigger },
);

gsap.fromTo(
  'footer .top .first .box',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 1.3, scrollTrigger: contactBox.trigger },
);

gsap.fromTo(
  'footer .top .second .title',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 1.3, scrollTrigger: contactBox.trigger },
);

gsap.fromTo(
  'footer .top .second .socials',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 1.3, scrollTrigger: contactBox.trigger },
);

gsap.fromTo(
  'footer .top .third .box',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, delay: 1.3, scrollTrigger: contactBox.trigger },
);



document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const footer = document.querySelector('footer');
  const wrapper = document.querySelector('.wrapper');

  const mobileToggle = document.getElementById('mobile-toggle');
  mobileToggle.addEventListener('change', () => {
    if (mobileToggle.checked) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  });

});