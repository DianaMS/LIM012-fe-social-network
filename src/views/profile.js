import { getPosts, getComments } from '../controller-fire/filter-data.js';

export const profile = () => {
  const div = document.createElement('div');
  div.id = 'profile-posts';
  // Personalize profile
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getPosts(user.uid, div, 'userId', user.uid);
      getComments(user.uid);
    }
  });
  return div;
};
