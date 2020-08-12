export default () => {
  const div = document.createElement('div');
  div.className = 'themes-options2';
  const divcontent = `
   <div class="cont">
    <button class="light-mode">LIGHT MODE <i class="far fa-sun"></i></button>
    <button class="dark-mode">DARK MODE <i class="far fa-moon"></i></button>
   </div>`;
  div.innerHTML = divcontent;
  window.onclick = (event) => {
    if (event.target === div) {
      window.history.back();
    }
  };
  const darkMode = div.querySelector('.dark-mode');
  const lightMode = div.querySelector('.light-mode');

  darkMode.addEventListener('click', () => {
    document.body.classList.add('dark');
  });

  lightMode.addEventListener('click', () => {
    document.body.classList.remove('dark');
  });

  return div;
};
