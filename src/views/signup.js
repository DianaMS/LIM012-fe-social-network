export const signup = () => {
  const div = document.createElement('div');
  div.id = 'signup-modal';
  const signupView = `
  <header>
    <h1 class="h1-style"><img src="images/logo.png" alt="app logo"> BUNKER</h1>
    <h2>Share your knowledgement!</h2>
    <h3>WELCOME!</h3>
  </header>
  <main>
    <form id="login-form">
      <input type="text" id="signup-username" placeholder="username" required>
      <input type="email" id="signup-email" placeholder="email" required>
      <input type="password" id="signup-password" placeholder="password" required>
      <div>
        <input type="checkbox" id="agreement" required>
        <label for="agreement">I agree to the Terms of Service and Privacy Statement</label>
      </div>
      <button><a href="#/home">SIGN UP</a></button>
    </form>
    <p>Already have an account? <a href="#/log-in">LOG IN HERE</a></p>
  </main>`;
  div.innerHTML = signupView;
  return div;
};
