import cross from './images/plus.png';

/* eslint-disable no-console */
// eslint-disable-next-line func-names
const imageSliderModule = (function () {
  const sliderContainer = document.createElement('div');
  const article = document.getElementById('article');
  const albumSlide = document.getElementById('slide-show-container');

  function displaySlider() {
    sliderContainer.classList.add('imageSliderContainer');
    sliderContainer.innerHTML = `
    <button class = "close"><img class = "cross" src = ${cross}></button>
    <div>
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
    </div>

    `;

    article.appendChild(sliderContainer);
    article.removeChild(albumSlide);

    document.querySelector('.cross').addEventListener('click', () => {
      article.removeChild(sliderContainer);
      article.appendChild(albumSlide);
    });
  }
  function albumSelect() {
    const albums = document.querySelectorAll('.albums');
    albums.forEach((album) => {
      album.addEventListener('click', displaySlider);
    });
  }
  return { albumSelect };
}());

export default imageSliderModule;
