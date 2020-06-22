import { getPosts, getComments } from '../controller-fire/filter-data.js';
import { currentUser } from '../firebase/auth.js';

export const profile = () => {
  const div = document.createElement('div');
  div.id = 'profile-posts';
  // Personalize profile
  console.log('holi estoy en profile');
  const user = currentUser();
  getPosts(user.uid, div, 'userId', user.uid);
  getComments(user.uid);
  return div;
};
