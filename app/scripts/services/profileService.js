'use strict';

//TODO verwijderen
app.factory('ProfileService', function (FIREBASE_URL, $firebaseObject, PostService, $q) {
  var ref = new Firebase(FIREBASE_URL);

  var profile = {
    get: function (userId) {
      return $firebaseObject(ref.child('profile').child(userId));
    }

    //getPosts: function(userId) {
    //  var defer = $q.defer();
    //
    //  $firebase(ref.child('user_posts').child(userId))
    //    .$asArray()
    //    .$loaded()
    //    .then(function(data) {
    //      var posts = {};
    //
    //      for(var i = 0; i<data.length; i++) {
    //        var value = data[i].$value;
    //        posts[value] = PostService.getPost(value);
    //      }
    //      defer.resolve(posts);
    //    });
    //
    //  return defer.promise;
    //}
  };

  return profile;
});
