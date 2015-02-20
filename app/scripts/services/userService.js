'use strict';

app.factory('UserService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var users = $firebase(ref.child('user_profiles')).$asArray();

  var UserService = {
    all: users,
    get: function (userId) {
      return $firebase(ref.child('user_profiles').child(userId)).$asObject();
    },
    delete: function (user) {
      return users.$remove(user);
    }
  };

  return UserService;
});
