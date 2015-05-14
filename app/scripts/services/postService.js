'use strict';

//TODO delete this service
app.factory('PostService', function ($firebaseArray, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);

  var Post = {
    all: function(eventId){
      var posts = $firebaseArray(ref.child('events').child(eventId).child('posts'));
      return posts;
    },
    createPost: function (eventId, post) {
      var posts = $firebaseArray(ref.child('events').child(eventId).child('posts'));
      return posts.$add(post);
    },
    deletePost: function (eventId, post) {
      var posts = $firebaseArray(ref.child('events').child(eventId).child('posts'));
      return posts.$remove(post);
    }
  };

  return Post;
});
