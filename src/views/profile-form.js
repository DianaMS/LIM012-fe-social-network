import { currentUser } from '../firebase/auth.js';
import { addFileToStorage, getFileFromStorage } from '../firebase/storage.js';
import { updateDocument } from '../firebase/firestore.js';

export const profileForm = () => {
  const form = document.createElement('form');
  form.id = 'profile-form';
  const template = `
      <label for="profile-img-selected">Change profile picture</label>
      <input type="file" id="profile-img-selected" name="profile-picture" accept="image/png, image/jpeg">
      <label for="new-username">USER NAME</label>
      <input type="text" id="new-username" placeholder="Username">
      <label for="bio">BIO</label>
      <input type="text" id="bio" placeholder="Tell me something about you">
      <button id="edit-button" class="submit-button-style">SAVE</button>`;
  form.innerHTML = template;
  const user = currentUser();
  // Change photo
  const changePhoto = form.querySelector('#profile-img-selected');
  changePhoto.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const refPath = `${user.uid}/${file.name}`;
    changePhoto.name = refPath;
    document.querySelector('#photo-edited').src = URL.createObjectURL(file);
    addFileToStorage(refPath, file);
  });
  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputUserName = form['new-username'].value;
    const inputBio = form.bio.value;

    if (inputUserName) {
      user.updateProfile({
        displayName: inputUserName,
      });
      updateDocument('users', user.uid, 'userName', inputUserName);
    }
    if (inputBio) {
      updateDocument('users', user.uid, 'bio', inputBio);
    }
    if (changePhoto) {
      getFileFromStorage(changePhoto.name).then((url) => {
        user.updateProfile({
          photoURL: url,
        });
        updateDocument('users', user.uid, 'userPhoto', url);
      });
    }
    window.location.hash = '#/home';
  });
  return form;
};
