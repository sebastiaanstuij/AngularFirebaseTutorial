'use strict';

app.factory('UsersService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var users = $firebase(ref.child('user_profiles')).$asArray();

  var Users = {
    all: users,
    get: function (userId) {
      return $firebase(ref.child('user_profiles').child(userId)).$asObject();
    },
    delete: function (user) {
      return users.$remove(user);
    }
  };

  return Users;
});
