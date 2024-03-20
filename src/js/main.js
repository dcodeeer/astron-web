gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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