'use strict';

app.factory('AuthService', function ($rootScope, $firebaseAuth, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var firebaseAuthService = $firebaseAuth(ref);

  var auth = {
    register: function (user) {
      return firebaseAuthService.$createUser(user.email, user.password);
    },
    login: function(user){
      return firebaseAuthService.$authWithPassword({
        email: user.email,
        password: user.password,
        isAdmin: false
      });
    },
    logout: function() {
      firebaseAuthService.$unauth();
    },
    resolveUser: function() {
      return firebaseAuthService.$getAuth();
    },
    waitForAuth: function() {
      return firebaseAuthService.$waitForAuth();
    },
    requireAuth: function() {
      return firebaseAuthService.$requireAuth();
    },
    signedIn: function() {
      return !!auth.user.provider;
    },
    isAdmin: function() {
      if (this.signedIn()){
        return !!auth.user.profile.isAdmin;
      }
      else {
        return false;
      }
    },
    createProfile: function (user) {
      var profile = {
        username: user.username
      };
      var profileRef = $firebase(ref.child('user_profiles'));
      return profileRef.$set(user.uid, profile);
    },
    user: {}
  };

  firebaseAuthService.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, auth.user);
      auth.user.profile = $firebase(ref.child('user_profiles').child(auth.user.uid)).$asObject();
      console.log('($onAuth) Logged in as: ', auth.user.profile);
    } else {
      if(auth.user && auth.user.profile) {
        auth.user.profile.$destroy();
      }
      angular.copy({}, auth.user);
      console.log('($onAuth) Logged out');
    }
  });

  return auth;
});
