export default () => {
  const notFound = document.createElement('div');
  notFound.className = 'nf-page';
  notFound.innerHTML = `
      <section class='nf-content'>
        <img src="./images/404.png" class='nf-image'>
        <p class='nf-text'>PAGE NOT FOUND</p>
      </section>
    `;
  return notFound;
};
