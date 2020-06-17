import { updateDocument } from '../firebase/crud.js';

export const renderComment = (postsComments, postId, sizeComments) => {
  const divComment = document.getElementById(postId);
  divComment.innerHTML = '';
  postsComments.forEach((com) => {
    const div = document.createElement('div');
    div.className = 'name-comments';
    const comment = com.data();
    const getdate = comment.date.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const template = `
        <div class= "header-comment">
            <img src="./images/profile-img-woman.png" class="user-comment">
            <div>
            <h2><b>${comment.userName}</b><br>${shortTime} ${shortDate}</h2>
            </div>
            <div class="hide tooltip-container" id="show-tootTip-${com.id}">
                <div class="tooltip">
                    <div idComent="${com.id}" class="opt update-comment edit-${com.id}"><i class="fas fa-pen"></i><span>Edit</span></div>
                    <div idComent="${com.id}" class="opt del"><i class="fas fa-trash"></i><span>Delete</span></div>
                </div>
            </div>
            <span class="comment">
                <i id="option-${com.id}" class="fas fa-ellipsis-h"></i>
            </span>
        </div>
        <div class= "main-comment">
            <div class="text-post">
                <p class="p-comment" id="textComment-${com.id}">${comment.content}</p>
                <div class="save-comment hide" idComent="${com.id}"><i class="fas fa-sync"></i></div>
            </div>
        </div>
      `;
    div.innerHTML = template;
    const optionsOfComments = div.querySelector(`#option-${com.id}`);
    if (optionsOfComments) {
      optionsOfComments.addEventListener('click', () => {
        const tool = document.querySelector(`#show-tootTip-${com.id}`);
        tool.classList.toggle('hide');
      });
    }
    const editComment = div.querySelector(`.edit-${com.id}`);
    if (editComment) {
      editComment.addEventListener('click', () => {
        const tool = document.querySelector(`#show-tootTip-${com.id}`);
        tool.classList.toggle('hide');
      });
    }

    const photoBeforeComment = div.querySelector('.user-comment');
    if (comment.userPhoto !== null || '') {
      // eslint-disable-next-line no-param-reassign
      photoBeforeComment.src = comment.userPhoto;
    }
    auth.onAuthStateChanged((user) => {
      const userId = user.uid;
      if (userId !== comment.uid) {
        optionsOfComments.style.display = 'none';
      }
    });
    const iconSaveCom = div.querySelectorAll('.save-comment');
    if (iconSaveCom.length) {
      iconSaveCom.forEach((comments) => {
        comments.addEventListener('click', (e) => {
          e.preventDefault();
          const idComent = comments.getAttribute('idComent');
          const newContent = document.querySelector(`#textComment-${idComent}`);
          if (newContent.innerText.trim() !== '') {
            newContent.contentEditable = 'false';
            comments.classList.add('hide');
            const text = newContent.innerText.trim();
            updateDocument('comments', idComent, ['content'], [text]);
          }
        });
      });
    }
    divComment.appendChild(div);
    return div;
  });
  const sizeComment = document.getElementById(`size-${postId}`);
  sizeComment.innerHTML = sizeComments;
};
