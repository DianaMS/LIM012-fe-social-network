import { components } from './views/index.js';

const actualView = document.getElementById('actual-view');
const homeView = document.querySelector('.home-view');
const mainContainer = document.querySelector('#main-container');

export const changeView = (route) => {
  actualView.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/log-in':
    case '#/': {
      homeView.classList.remove('display-flex');
      return actualView.appendChild(components.login());
    }
    case '#/sign-up': {
      homeView.classList.remove('display-flex');
      actualView.appendChild(components.login());
      const switchModal = actualView.querySelector('#switch-modal');
      switchModal.innerHTML = '';
      return switchModal.appendChild(components.signup());
    }
    case '#/home': {
      mainContainer.innerHTML = '';
      homeView.classList.add('display-flex');
      mainContainer.appendChild(components.home());
      const mainSection = mainContainer.querySelector('.main-section-style');
      mainSection.classList.add('flex-row');
      const userInfo = mainContainer.querySelector('.user-info');
      return userInfo.classList.remove('display-flex');
    }
    case '#/profile': {
      homeView.classList.add('display-flex');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(components.home());
      const mainSection = mainContainer.querySelector('#main-section');
      mainSection.classList.remove('.flex-row');
      const userInfo = mainContainer.querySelector('.user-info');
      userInfo.classList.add('display-flex');
      const coreRail = mainContainer.querySelector('#core-rail');
      coreRail.innerHTML = '';
      return coreRail.appendChild(components.profile());
    }
    case '#/post-section': {
      homeView.classList.add('display-flex');
      mainContainer.innerHTML = '';
      return mainContainer.appendChild(components.postForm());
    }
    case '#/profile-form': {
      homeView.classList.add('display-flex');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(components.postForm());
      const switchForm = document.querySelector('#switch-form');
      switchForm.innerHTML = '';
      return switchForm.appendChild(components.profileForm());
    }
    case '#/theme-options': {
      actualView.innerHTML = '';
      return actualView.appendChild(components.themes());
    }
    default:
      actualView.innerHTML = '';
      return actualView.appendChild(components.notFound());
  }
};
