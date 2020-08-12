import { logout } from './firebase/auth.js';
import { changeView } from './router.js';
import { firebaseConfig } from './firebase-config.js';

// Firebase conection
firebase.initializeApp(firebaseConfig);

// Views
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

// CSS effect on load
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('loader2');
  init();
});

// Display menu
const settingsButton = document.querySelector('.options');
const menu = document.querySelector('.menu-nav');
settingsButton.addEventListener('click', () => {
  menu.classList.toggle('display-flex');
});

// Display themes
const themes = document.querySelector('.theme-options');
themes.addEventListener('click', () => {
  window.location.hash = '#/theme-options';
});
// Log out
const logOutButton = document.querySelector('#log-out');
logOutButton.addEventListener('click', () => {
  logout();
  window.location.hash = '#/log-in';
});
