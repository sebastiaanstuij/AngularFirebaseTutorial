'use strict';

app.factory('PostService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var posts = $firebase(ref.child('posts')).$asArray();

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
    }
  };

  return Post;
});
