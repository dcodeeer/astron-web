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