export const login = () => {
  const div = document.createElement('div');
  div.id = 'login-signup-view';
  const loginView = `
  <img class="cover-app-photo" src="images/cover.png" alt="cover photo">
  <img class="cover-desktop-photo" src="images/coverDesktop.png" alt="cover photo">
  <div id="switch-modal">
    <div id="login-modal">
      <header>
        <h1 class="h1-style"><img src="images/logo.png" alt="app logo"> BUNKER</h1>
        <h2>Share your knowledgement!</h2>
        <h3>WELCOME!</h3>
      </header>
      <main>
        <form id="login-form">
          <input type="email" id="login-email" placeholder="email" required>
          <input type="password" id="login-password" placeholder="password" required>
          <p>forgot password?</p>
          <button><a href="#/home">LOG IN</a></button>
        </form>
        <p>or login with...</p>
        <div class = "googleAndFacebookicons">
          <i class="fab fa-google"></i>
          <i class="fab fa-facebook-f"></i>
        </div>
        <p>Don't have an account? <a href="#/sign-up">SIGN UP HERE</a> </p>
      </main>
    </div>
  </div>`;
  div.innerHTML = loginView;
  return div;
};
