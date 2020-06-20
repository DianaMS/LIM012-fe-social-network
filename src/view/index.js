import login from './login-view.js';
import signup from './signup-view.js';
// eslint-disable-next-line import/no-cycle
import home from './home-view.js';
// eslint-disable-next-line import/no-cycle
import profile from './profile-view.js';
import postform from './post-content.js';
import editProfile from './edit-profile.js';
import themes from './theme-options.js';
import notFound from './404.js';

const components = {
  login,
  signup,
  home,
  profile,
  postform,
  editProfile,
  themes,
  notFound,
};
export { components };
