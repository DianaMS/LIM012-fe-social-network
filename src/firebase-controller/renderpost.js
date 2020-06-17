/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
import { formComment, addDocumentIdToUserCollection } from '../firebase/crud.js';
import { deletePost } from './crud-controller.js';
import { changeView } from '../view-controler/router.js';

export const renderPost = (doc, userId) => {
  const post = doc;
  const time = doc.date;
  const getdate = time.toDate();
  const shortDate = getdate.toDateString();
  const shortTime = getdate.toLocaleTimeString();
  const li = document.createElement('li');
  li.className = 'publication';
  li.innerHTML = `
  <div class="header">
    <img class="profile" src="./images/profile-img-woman.png">
    <div class="date">
    <b>${post.userName}</b><br>${shortTime} ${shortDate}
    </div>
    <div class="modal-options">
      <ul>
        <li><i class="fas fa-pen edit"></i><span>Edit</span></li>
        <li><i class="fas fa-trash delete"></i><span>Delete</span></li>
      </ul>
    </div>
  </div>
  <div id="user-post-content">
    <div class="main">${post.content}</div>
  </div>
  <div class="footer">
    <i class="fas fa-heart "></i><span>${post.likes}</span>
    <i class="far fa-comments"></i><span id= "size-${post.id}"></span>
  </div>
  <div class="hide new-comment">
    <section class="imgC">
      <img src="./images/profile-img-woman.png" class="margin user-comment first">
      <input type="text" placeholder="Agrega un comentario.." class="inputComment">
      <i class="fab fa-telegram-plane icon-send"></i>
    </section>
    <div id=${post.id} class="container-comments"></div>
  </div>`;
  const clickComments = li.querySelector('.fa-comments');
  const inputToComment = li.querySelector('.inputComment');
  // COMMENTS
  const clickIconSend = li.querySelector('.icon-send');
  const commentInputPhoto = li.querySelector('.user-comment');
  auth.onAuthStateChanged((user) => {
    if (user.photoURL !== null || '') {
      commentInputPhoto.src = user.photoURL;
    }
    clickIconSend.addEventListener('click', () => {
      if (inputToComment.value) {
        const content = inputToComment.value;
        const likes = 0;
        const date = firebase.firestore.FieldValue.serverTimestamp();
        const userPhoto = user.photoURL;
        const userName = user.displayName;
        const uid = user.uid;
        formComment(post.id, content, likes, date, userPhoto, userName, uid)
          .then((docPost) => {
            inputToComment.value = '';
            addDocumentIdToUserCollection(user.uid, docPost.id, 'comments');
          });
      }
    });
  });
  const newComments = li.querySelector('.new-comment');
  clickComments.addEventListener('click', () => {
    newComments.classList.toggle('hide');
  });
  // LIKES
  const clickLikes = li.querySelector('.fa-heart');
  clickLikes.addEventListener('click', () => {
    let postLikes = post.likes;
    if (clickLikes.classList.contains('efect-like')) {
      postLikes--;
      db.collection('users').doc(userId).update({
        myLikes: firebase.firestore.FieldValue.arrayRemove(post.id),
      });
    } else {
      postLikes++;
      db.collection('users').doc(userId).update({
        myLikes: firebase.firestore.FieldValue.arrayUnion(post.id),
      });
    }
    db.collection('posts').doc(post.id).update({
      likes: postLikes,
    });
  });

  // PERSONALIZE POSTS
  const userPostContent = li.querySelector('#user-post-content');
  const dateTag = li.querySelector('.date');
  const header = li.querySelector('.header');
  const visibilityIcon = document.createElement('i');
  const menuIcon = document.createElement('i');
  menuIcon.className = 'fas fa-ellipsis-h';
  db.collection('users').doc(userId).get().then((docId) => {
    const likesIds = docId.data().myLikes;
    const postIds = docId.data().posts;
    if (postIds.some(id => id === doc.id)) {
      header.appendChild(menuIcon);
    }
    if (likesIds.some(id => id === doc.id)) {
      clickLikes.classList.add('efect-like');
    } else {
      clickLikes.classList.remove('efect-like');
    }
  });
  if (post.visibility === 'public') {
    visibilityIcon.className = 'fas fa-globe-americas privacity';
  } else {
    visibilityIcon.className = 'fas fa-lock';
  }
  dateTag.appendChild(visibilityIcon);
  const profilePhoto = li.querySelector('.profile');
  if (doc.userPhoto !== '') {
    profilePhoto.src = doc.userPhoto;
  }
  const modalOptions = li.querySelector('.modal-options');
  menuIcon.addEventListener('click', () => {
    modalOptions.classList.toggle('options-appear');
  });
  if (post.photo !== '') {
    const img = document.createElement('img');
    img.className = 'photo-post';
    img.alt = 'photo';
    storage.ref().child(post.photo).getDownloadURL().then((url) => {
      img.src = url;
    });
    userPostContent.appendChild(img);
  }
  // DELETE POST
  const btnDelete = li.querySelector('.delete');
  btnDelete.addEventListener('click', () => deletePost(doc.id, userId));
  // EDIT POST
  const btnEdit = li.querySelector('.edit');
  btnEdit.addEventListener('click', () => {
    changeView('#/post-content', post.content, doc.id);
  });
  return li;
};
