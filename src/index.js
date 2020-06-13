import { changeView } from './router.js';
const firebaseConfig = {
  apiKey: 'AIzaSyDeygw3xwQJVQiMVnznSDqq9nnn5EDW8_w',
  authDomain: 'bunker-e836e.firebaseapp.com',
  databaseURL: 'https://bunker-e836e.firebaseio.com',
  projectId: 'bunker-e836e',
  storageBucket: 'bunker-e836e.appspot.com',
  messagingSenderId: '910029505675',
  appId: '1:910029505675:web:429344be4dd11f0d69408e',
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => {
        changeView(window.location.hash)
    });
};

window.addEventListener('load', init);