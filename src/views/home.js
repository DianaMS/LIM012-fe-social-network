export const home = () => {
  const div = document.createElement('div');
  div.id = 'home-view';
  const homeView = `
  <header>
    <h1 class="h1-style"><img src="images/logo.png" alt="app logo"> BUNKER</h1>
    <i class="fas fa-cog"></i>
  </header>
  <main>
  <div class="user-info">
    <div class="user-cover-photo-container">
      <div class="user-cover-photo"><img src="" alt="cover photo"></div>
      <img src="images/profile-cube.png" alt="profile photo" class="user-profile-photo pic-style">
    </div>
    <div class="username-bio">
      <h3>User Name</h3>
      <h4>My bio</h4>
    </div>
  </div>
  <section id="lateral-right">
    <div class="post-section">
      <img src="images/profile-cube.png" alt="profile photo" class="pic-style right-size">
      <a href="#/post-section">What's on your mind?</a>
    </div>
    <div id="core-rail">
      <div id="home-posts">
        <div class="actual-home-post">
          <div class="header-post">
            <img src="images/profile-cube.png" alt="profile photo" class="pic-style right-size">
            <div>
              <p>User Name</p>
              <p>Date<i class="fas fa-globe-americas"></i></p>
            </div>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div class="main-post">
            <p>ccc</p>
            <div></div>
          </div>
          <div class="footer-post">
            <i class="far fa-heart"></i>
            <i class="far fa-comments"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  </main>
  <footer>
    <i class="fas fa-home"></i>
    <i class="fas fa-user"></i>
  </footer>`;
  div.innerHTML = homeView;
  return div;
}