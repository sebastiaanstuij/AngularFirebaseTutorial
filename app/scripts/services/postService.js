'use strict';

app.factory('PostService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var posts = $firebase(ref.child('posts')).$asArray();
  var comments;

  var Post = {
    all: posts,
    createPost: function (post) {
      return posts.$add(post).then(function(postRef){
        $firebase(ref.child('user_posts').child(post.creatorUID))
          .$push(postRef.key());
        return postRef;
      });
    },
    getPost: function (postId) {
      return $firebase(ref.child('posts').child(postId)).$asObject();
    },
    deletePost: function (post) {
      return posts.$remove(post);
    },
    getComments: function (postId) {
      comments = $firebase(ref.child('comments').child(postId)).$asArray();
      return comments;
    },
    createComment: function (comment) {
      return comments.$add(comment);
    },
    deleteComment: function (comment) {
      return comments.$remove(comment);
    }
  };

  return Post;
});
