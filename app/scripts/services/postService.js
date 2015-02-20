'use strict';

//TODO delete this service
app.factory('PostService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  //var posts = $firebase(ref.child('posts')).$asArray();

  var Post = {
    all: function(eventId){
      var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
      return posts;
    },
    createPost: function (eventId, post) {
      var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
      return posts.$add(post);
    },
    deletePost: function (eventId, post) {
      var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
      return posts.$remove(post);
    }
  };

  return Post;
});
