import { addDocumentIdToUserCollection, formPost, updateDocument } from '../firebase/crud.js';

export default (content, postId) => {
  const div = document.createElement('div');
  div.className = 'post-container';
  const divcontent = `
    <div class="go-back"><i class="fas fa-arrow-left"></i></div>
    <section class="settings-section">
        <form id="post-form">
            <div id="option-public">
                <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
                <p>user</p>
                <select id="visibility-select">
                    <option>public</option>
                    <option>private</option>
                </select>
            </div>    
            <textarea id="post-content" placeholder="What's on your mind?" required></textarea>
            <div id="preview"></div>
            <input id="upload-photo" type="file">
            <label class="photo-icon" for="upload-photo"><i class="fas fa-photo-video"></i></label>
            <button class="btn-submit post">POST</button>
        <form>
    </section>`;
  div.innerHTML = divcontent;
  // GO BACK ARROW FUNCTION
  const goBack = div.querySelector('.fa-arrow-left');
  goBack.addEventListener('click', () => {
    window.history.back();
  });
  window.onclick = (event) => {
    if (event.target === div) {
      window.history.back();
    }
  };
  const postForm = div.querySelector('#post-form');
  postForm['post-content'].value = (typeof content === 'undefined') ? '' : content;

  if (postForm['post-content'].value.length > 0) {
    div.querySelector('.btn-submit').textContent = 'EDIT';
  }
  // SHOW PREVIEW OF SELECTED IMG
  const preview = postForm.querySelector('#preview');
  const uploadPhoto = postForm.querySelector('#upload-photo');
  const userNameOnPtag = postForm.querySelector('#option-public p');
  // SHARE A POST
  // UPLOAD FILES
  auth.onAuthStateChanged((user) => {
    userNameOnPtag.innerHTML = user.displayName;
    uploadPhoto.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const refPath = `User:${user.uid}/${file.name}`;
      uploadPhoto.name = refPath;
      storage.ref(refPath).put(file);
      preview.innerHTML = `<img src=${URL.createObjectURL(file)} id="preview-img" alt="preview">`;
    });

    // FORM POST FUNCTION
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newContent = postForm['post-content'].value;
      const visibility = postForm['visibility-select'].value;
      if (div.querySelector('.btn-submit').textContent === 'POST') {
        const likes = 0;
        const date = firebase.firestore.FieldValue.serverTimestamp();
        const photo = postForm['upload-photo'].name;
        const userPhoto = user.photoURL;
        const userName = user.displayName;
        formPost(newContent, likes, visibility, date, photo, userPhoto, userName)
          .then((doc) => {
            addDocumentIdToUserCollection(user.uid, doc.id, 'posts');
          })
          .then(() => {
            postForm.reset();
            window.history.back();
          });
      } else if (div.querySelector('.btn-submit').textContent === 'EDIT') {
        updateDocument('posts', postId, ['content', 'visibility'], [newContent, visibility])
          .then(() => {
            postForm.reset();
            window.history.back();
          });
      }
    });
  });
  return div;
};
