const dropdownListener = (e) => {
  const dropdown = e.currentTarget;

  const closeEvent = () => {
    const event = new Event('close');
    dropdown.dispatchEvent(event);
  };

  if (e.target.classList.contains('option')) {
    const selected = dropdown.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected'); 
    }    

    const option = e.target;
    if (option) {
      option.classList.add('selected');  
    }

    dropdown.querySelector('.select input').value = e.target.innerText;
    dropdown.querySelector('.hidden').setAttribute('data-name', e.target.getAttribute('data-name'));
    dropdown.querySelector('.hidden').value = e.target.getAttribute('data-value');
    dropdown.classList.remove('show');
    closeEvent();

    // profession only
      const changeEvent = new Event('change');
      dropdown.querySelector('.hidden').dispatchEvent(changeEvent);
    // profession only end
  } else {
    if (dropdown.classList.contains('show')) closeEvent();
    dropdown.classList.toggle('show');
  }

  // document.querySelectorAll('.dropdown').forEach(elem => elem.classList.remove('show'));
  return false;
};

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => dropdown.addEventListener('click', dropdownListener));

const dropdownCloseListener = (e) => {
  dropdowns.forEach((dropdown) => {
    const isClickInsideElement = dropdown.contains(e.target);
    if (!isClickInsideElement) {
      dropdown.classList.remove('show');
      const event = new Event('close');
      dropdown.dispatchEvent(event);
    }
  });
}

document.addEventListener('click', dropdownCloseListener);