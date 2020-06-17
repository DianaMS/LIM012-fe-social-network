/* eslint-disable import/no-cycle */
import { logout } from '../firebase/auth.js';
import { updateDocument } from '../firebase/crud.js';
import { renderPost } from '../firebase-controller/renderpost.js';
import { renderComment } from './template-comments.js';
import { getComment, getHomePosts } from '../firebase/filterdata.js';
import { addFileToStorage, getFileFromStorage } from '../firebase/storage.js';

export default () => {
  const div = document.createElement('div');
  div.id = 'home';
  div.className = 'view';
  const homeView = `
  <header>
    <div class="logo-bunker">
      <img src="images/logo.png" alt="logo" class="logo">
      <h1 class="title">BUNKER</h1>
    </div>
    <div class="icons">
        <a href="#/home" class="share"><i class="fas fa-home icon icon-up"></i></a>
        <a href="#/profile" class="profileBtn"><img class="profile circle user-icon" src="./images/profile-img-woman.png"></a>
        <button id="menuBtn">
          <i class="fas fa-cog icon"></i> 
          <i class="fas fa-bars icon"></i>
        </button>
    </div>
  </header>
  <main class="main-home app-content">
  <div id="route-change-content">
    <div id="profile-section" class="lateral-left">
      <div>
      <input id="upload-cover" type="file">
      <label class="camera-icon" for="upload-cover"><i class="fas fa-camera"></i></label>
        <img class="cover-profile" src="./images/default-cover.jpg">
        <img class="profile" src="./images/profile-img-woman.png">
      </div>
      <div class="profile-information">
        <h3></h3>
        <h5></h5>
      </div>
    </div>
    <div class="lateral-rigth">
      <div class="share-section container lateral-share">
        <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
        <a href="#/post-content" class="share">What's on your mind?</a>
      </div>
      <div class="core-rail">
        <ul id="public-posts">
          <!---publication--->
        </ul>
      </div>
    </div>
    </div>
    <div class="menu-container">
      <ul class="menu-options">
        <li class="edit-profile"><a href="#/edit-profile">Edit Profile</a></li>
        <li class="theme-options"><a href="#/theme-options">Themes</a></li>
        <li class="logout">Log out</li>
      </ul>
    </div>
  </main>
  <footer class="bar-down">
    <a href="#/home"><i class="fas fa-home icon"></i></a>
    <a href="#/profile"><i class="fas fa-user icon"></i></a>
  </footer>`;
  div.innerHTML = homeView;
  // DISPLAYING THE MENU
  const menuBtn = div.querySelector('#menuBtn');
  const menu = div.querySelector('.menu-container');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('appear');
  });
  const uploadCover = div.querySelector('#upload-cover');
  const coverProfile = div.querySelector('.cover-profile');
  // LOG OUT
  const logoutBtn = div.querySelector('.logout');
  logoutBtn.addEventListener('click', logout);
  // COVER PHOTO
  auth.onAuthStateChanged((user) => {
    if (user) {
      // eslint-disable-next-line no-return-assign
      uploadCover.addEventListener('change', (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const refPath = `User:${user.uid}/${file.name}`;
        uploadCover.name = refPath;
        addFileToStorage(refPath, file).then((response) => {
          getFileFromStorage(response.metadata.fullPath).then((url) => {
            coverProfile.src = url;
            updateDocument('users', user.uid, ['cover'], [url]);
          });
        });
      });
      // PERSONALIZE VIEW
      const profileH3 = div.querySelector('.profile-information h3');
      const profileH5 = div.querySelector('.profile-information h5');
      profileH3.innerHTML = user.displayName;
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        if (doc.data().bio !== '') {
          profileH5.innerHTML = doc.data().bio;
        } else {
          profileH5.innerHTML = 'Usuario de BUNKER';
        }
        if (doc.data().cover !== '') {
          coverProfile.src = doc.data().cover;
        }
      });
      const profileImg = div.querySelectorAll('img[src="./images/profile-img-woman.png"]');
      if (user.photoURL) {
        profileImg.forEach((tag) => {
          // eslint-disable-next-line no-param-reassign
          tag.src = user.photoURL;
        });
      }
      // FIRESTORE GET DATA TO SHOW IN HOME VIEW
      const publicPosts = div.querySelector('#public-posts');
      getHomePosts((documents) => {
        publicPosts.innerHTML = '';
        documents.forEach((doc) => {
          publicPosts.appendChild(renderPost(doc, user.uid));
        });
      });
      getComment(user.uid, renderComment);
    }
  });
  return div;
};

export { renderPost };
