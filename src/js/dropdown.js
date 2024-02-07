const dropdownListener = (e) => {
  const options = e.currentTarget.querySelector('.options');

  const dropdown = e.currentTarget;

  const dropdownCloseListener = (e) => {
    const isClickInsideElement = dropdown.contains(e.target);
    if (!isClickInsideElement) {
      options.classList.toggle('show');
      document.removeEventListener('click',dropdownCloseListener)
      return;
    }
  }

  document.addEventListener('click', dropdownCloseListener);

  if (e.target.classList.contains('option')) {
    e.currentTarget.querySelector('.select input').value = e.target.innerText;
    e.currentTarget.querySelector('.hidden').setAttribute('data-name', e.target.getAttribute('data-name'));
    e.currentTarget.querySelector('.hidden').value = e.target.getAttribute('data-value');
    options.classList.remove('show');

    // profession only
      const changeEvent = new Event('change');
      e.currentTarget.querySelector('.hidden').dispatchEvent(changeEvent);
    // profession only end

    options.querySelectorAll('.headline').forEach(elem => elem.querySelector('.list').classList.remove('opened'));
  } else {
    options.classList.toggle('show');
    options.querySelectorAll('.headline').forEach(elem => elem.querySelector('.list').classList.remove('opened'));
  }
};

const titles = document.querySelectorAll('.headline .title');
titles.forEach((title) => title.addEventListener('click', (e) => {
  e.stopPropagation();
  e.currentTarget.parentNode.querySelector('.list').classList.toggle('opened');
}));

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => dropdown.addEventListener('click', dropdownListener));