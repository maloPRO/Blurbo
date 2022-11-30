/* eslint-disable no-console */
import plusIcon from './images/plusIcon.png';
import deleteIcon from './images/delete.png';
import imageSliderModule from './images';

const albumModule = (function () {
  const albumList = JSON.parse(localStorage.getItem('albums')) || [];
  const albumSlider = document.getElementById('album-slider');
  const addAlbumDiv = document.createElement('div');
  const addIcon = new Image();
  const form = document.createElement('form');
  const titleInput = document.createElement('input');
  const addBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');

  // Add album section
  albumSlider.appendChild(addAlbumDiv);
  addAlbumDiv.classList.add('addAlbumDiv');
  addIcon.src = plusIcon;
  addAlbumDiv.appendChild(addIcon);

  // Add album form
  form.classList.add('albumForm');
  titleInput.setAttribute('required', true);
  addBtn.textContent = 'Add';
  cancelBtn.textContent = 'Cancel';
  addBtn.setAttribute('type', 'submit');
  cancelBtn.setAttribute('type', 'button');
  form.append(titleInput, addBtn, cancelBtn);

  class Album {
    constructor(title) {
      this.title = title;
    }
  }

  const addAlbum = (title) => {
    const newAlbum = new Album(titleInput.value);
    albumList.push(newAlbum);
    localStorage.setItem('albums', JSON.stringify(albumList));
    return { title };
  };

  const displayForm = () => {
    addAlbumDiv.removeChild(addIcon);
    addAlbumDiv.appendChild(form);
  };
  const closeForm = () => {
    addAlbumDiv.removeChild(form);
    addAlbumDiv.appendChild(addIcon);
  };
  const displayAlbum = ({ title }) => {
    const albumCard = document.createElement('div');
    const albumName = document.createElement('div');

    albumSlider.removeChild(addAlbumDiv);
    albumSlider.appendChild(albumCard);

    albumCard.classList.add('albumCard');
    albumName.classList.add('albums');
    albumName.textContent = `${title.charAt(0).toUpperCase()}${title.slice(1).toLowerCase()}`;

    const deleteAlbum = document.createElement('div');
    deleteAlbum.classList.add('deleteAlbum');

    albumCard.append(albumName, deleteAlbum);

    const deleteBtn = new Image();
    deleteBtn.src = deleteIcon;
    deleteAlbum.appendChild(deleteBtn);

    deleteAlbum.addEventListener('click', function () {
      this.parentElement.remove();
      albumList.forEach((album, index) => {
        albumList.splice(index, 1);
        localStorage.setItem('albums', JSON.stringify(albumList));
      });
    });
    albumSlider.appendChild(addAlbumDiv);
  };

  function handleForm(e) {
    e.preventDefault();
    const album = addAlbum(titleInput.value);
    displayAlbum(album);
    closeForm();
    form.reset();
    imageSliderModule.albumSelect();
  }
  albumList.forEach(displayAlbum);

  form.addEventListener('submit', handleForm);
  addIcon.addEventListener('click', displayForm);
  cancelBtn.addEventListener('click', closeForm);
  return { albumList };
}());

export default albumModule;
