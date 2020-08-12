import {
  firstTimeUser, updateDocument, getRealTimeDocument,
} from '../firebase/firestore.js';
import { getPosts, getComments } from '../controller-fire/filter-data.js';
import { addFileToStorage, getFileFromStorage } from '../firebase/storage.js';

export const home = () => {
  const div = document.createElement('div');
  div.id = 'main-section';
  div.className = 'main-section-style';
  const homeView = `
    <div class="user-info">
      <div class="user-cover-photo-container">
        <label for="cover-img-selected"><i class="fas fa-camera"></i></label>
        <input type="file" id="cover-img-selected" name="cover-picture" accept="image/png, image/jpeg">
        <img class="user-cover-photo">
        <img src="images/profile-cube.png" class="user-profile-photo home-pic pic-style">
      </div>
      <div class="username-bio">
        <h3></h3>
        <h5></h5>
      </div>
    </div>
    <section id="lateral-right">
      <div class="post-section">
        <img src="images/profile-cube.png" class="pic-style home-pic right-size">
        <a href="#/post-section">What's on your mind?</a>
      </div>
      <div id="core-rail">
        <div id="home-posts">
        </div>
      </div>
    </section>`;
  div.innerHTML = homeView;
  // Personalize Home
  const homePosts = div.querySelector('#home-posts');
  const profileName = div.querySelector('.username-bio h3');
  const profileBio = div.querySelector('.username-bio h5');
  const coverPhoto = div.querySelector('.user-cover-photo');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Photo - Username - Cover Photo
      getRealTimeDocument('users', user.uid, (doc) => {
        profileName.textContent = doc.data().userName;
        profileBio.textContent = doc.data().bio;
        if (doc.data().userPhoto) {
          const photoPost = document.querySelectorAll('.home-pic');
          photoPost.forEach((imgTag) => {
            // eslint-disable-next-line no-param-reassign
            imgTag.src = doc.data().userPhoto;
          });
        }
        if (doc.data().coverPhoto) {
          coverPhoto.src = doc.data().coverPhoto;
        }
      });
      firstTimeUser(user.uid, user.displayName, user.photoURL);
      // Show all posts and their comments
      getPosts(user.uid, homePosts, 'visibility', 'public');
      getComments(user.uid);
      const changeCover = div.querySelector('#cover-img-selected');
      changeCover.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const refPath = `${user.uid}/${file.name}`;
        changeCover.name = refPath;
        addFileToStorage(refPath, file).then((data) => {
          getFileFromStorage(data.metadata.fullPath).then((url) => {
            coverPhoto.src = url;
            updateDocument('users', user.uid, 'coverPhoto', url);
          });
        });
      });
    }
  });
  return div;
};
