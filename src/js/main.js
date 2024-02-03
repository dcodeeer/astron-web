document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const footer = document.querySelector('footer');
  const wrapper = document.querySelector('.wrapper');

  const mobileToggle = document.getElementById('mobile-toggle');
  mobileToggle.addEventListener('change', () => {
    if (mobileToggle.checked) {
      body.style.overflow = 'hidden';
      footer.style.zIndex = '-1';
      wrapper.style.zIndex = '-1';
    } else {
      body.style.overflow = 'auto';
      footer.style.zIndex = '0';
      wrapper.style.zIndex = '0';
    }
  });

  // scroll only index

  document.addEventListener('scroll', (e) => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = '#0D0D0D';
    } else {
      header.style.background = 'transparent';
    }
  });

});