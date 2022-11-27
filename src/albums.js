/* eslint-disable no-console */
import plusIcon from './images/plusIcon.png';
import deleteIcon from './images/delete.png';

const albumModule = (function () {
  const albumList = [];
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

  const addAlbum = () => {
    const newAlbum = new Album(titleInput.value);
    albumList.push(newAlbum);
  };

  const displayForm = () => {
    addAlbumDiv.removeChild(addIcon);
    addAlbumDiv.appendChild(form);
  };
  const closeForm = () => {
    addAlbumDiv.removeChild(form);
    addAlbumDiv.appendChild(addIcon);
  };
  const displayAlbum = () => {
    const albumCard = document.createElement('div');
    albumSlider.removeChild(addAlbumDiv);
    albumSlider.appendChild(albumCard);
    albumCard.classList.add('albums');
    albumCard.textContent = titleInput.value;

    const deleteAlbum = document.createElement('div');
    deleteAlbum.classList.add('deleteAlbum');
    albumCard.appendChild(deleteAlbum);

    const deleteBtn = new Image();
    deleteBtn.src = deleteIcon;
    deleteAlbum.appendChild(deleteBtn);

    deleteAlbum.addEventListener('click', function () {
      this.parentElement.remove();
    });
    albumSlider.appendChild(addAlbumDiv);
  };

  function handleForm(e) {
    addAlbum();
    displayAlbum();
    closeForm();
    form.reset();
    e.preventDefault();
  }
  albumList.forEach(displayAlbum);

  form.addEventListener('submit', handleForm);
  addIcon.addEventListener('click', displayForm);
  cancelBtn.addEventListener('click', closeForm);
  return { albumList };
}());

export default albumModule;
