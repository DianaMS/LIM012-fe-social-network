import { deletingCommentFromUser, updateCommentFromUser } from '../firebase-controller/crud-controller.js';

export const getHomePosts = (callback) => {
  db.collection('posts').where('visibility', '==', 'public').orderBy('date', 'desc').onSnapshot((postsDocuments) => {
    const documents = postsDocuments.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(documents);
  });
};

export const onlyMyPost = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        const myPostsIds = doc.data().posts;
        db.collection('posts').orderBy('date', 'desc').onSnapshot((post) => {
          // eslint-disable-next-line max-len
          const docMyPosts = post.docs.filter(allPost => myPostsIds.some(myPost => allPost.id === myPost));
          const docMyPost = docMyPosts.map(doc2 => ({ id: doc2.id, ...doc2.data() }));
          callback(docMyPost, user.uid);
        });
      });
    }
  });
};

// Leer comentarios
export const getComment = (userId, callback) => {
  db.collection('users').doc(userId).get().then((docId) => {
    db.collection('comments').orderBy('date', 'desc').onSnapshot((comments) => {
      db.collection('posts').get()
        .then((posts) => {
          let postIds = posts.docs.map(post => post.id);
          if (window.location.hash === '#/profile') {
            postIds = docId.data().posts;
          }
          postIds.forEach((postId) => {
            const postComments = comments.docs.filter(comment => comment.data().postId === postId);
            callback(postComments, postId, postComments.length);
            deletingCommentFromUser(userId, postId);
            updateCommentFromUser();
          });
        });
    });
  });
};