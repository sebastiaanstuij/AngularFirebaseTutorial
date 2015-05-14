'use strict';

app.factory('UserService', function ($firebaseObject, $firebaseArray, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var users = $firebaseArray(ref.child('user_profiles'));

  var UserService = {
    all: users,
    get: function (userId) {
      return $firebaseObject(ref.child('user_profiles').child(userId));
    },
    delete: function (user) {
      return users.$remove(user);
    }
  };

  return UserService;
});
