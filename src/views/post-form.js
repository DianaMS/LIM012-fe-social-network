import { addPost, addDocumentIdToUserCollection } from '../firebase/firestore.js';
import { currentUser } from '../firebase/auth.js';
import { addFileToStorage, getFileFromStorage } from '../firebase/storage.js';

export const postForm = () => {
  const user = currentUser();
  const div = document.createElement('div');
  div.id = 'form-template-container';
  const template = `
  <div>
    <i class="fas fa-arrow-left"></i>
  </div>
  <section id="switch-content">
  <div>
    <img id="photo-edited"src=${user.photoURL} alt="profile photo" class="right-size pic-style">
    <h3>${user.displayName}</h3>
  </div>
  <div id="switch-form">
    <form id="post-form">
    <select name="visibility" id="visibility">
      <option value="public">public</option>
      <option value="private">private</option>
    </select>
      <textarea id="post-content" autofocus>
      </textarea>
        <div id="preview"></div>
        <input id="upload-photo" type="file" accept="image/png, image/jpeg">
        <label class="photo-icon" for="upload-photo"><i class="fas fa-photo-video"></i></label>
      <button id="post-button" class="submit-button-style">POST</button>
    </form>
  </div>
  </section>
  `;
  div.innerHTML = template;
  // GO BACK BUTTON
  const goBackButton = div.querySelector('.fa-arrow-left');
  goBackButton.addEventListener('click', () => {
    window.history.back();
  });
  const makeAPostForm = div.querySelector('#post-form');
  // SHOW PREVIEW OF SELECTED IMG
  const preview = makeAPostForm.querySelector('#preview');
  const uploadPhoto = makeAPostForm.querySelector('#upload-photo');
  uploadPhoto.addEventListener('change', (e) => {
    const img = document.createElement('img');
    img.className = 'preview-img';
    const file = e.target.files[0];
    const refPath = `${user.uid}/${file.name}`;
    uploadPhoto.name = refPath;
    addFileToStorage(refPath, file).then((response) => {
      getFileFromStorage(response.metadata.fullPath).then((url) => {
        img.src = url;
      });
    });
    preview.appendChild(img);
  });
  // MAKE A POST
  makeAPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    preview.innerHTML = '';
    const content = makeAPostForm['post-content'].value;
    const visibility = makeAPostForm.visibility.value;
    const photo = makeAPostForm['upload-photo'].name;
    addPost(user.uid, content, photo, visibility).then((doc) => {
      addDocumentIdToUserCollection(user.uid, doc.id, 'myPosts');
    });
    window.history.back();
  });

  return div;
};