import { components } from './views/index.js'
export const changeView = (route) => {
  const actualView = document.getElementById('actual-view');
  actualView.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/log-in':
    case '#/': {
      return actualView.appendChild(components.login());
    }
    case '#/sign-up': {
      actualView.appendChild(components.login())
      const switchModal = document.getElementById('switch-modal');
      switchModal.innerHTML = '';
      return switchModal.appendChild(components.signup());
    }
    case '#/home': {
      return actualView.appendChild(components.home());
    }
    default:
      return actualView.innerHTML = '';
  }

}