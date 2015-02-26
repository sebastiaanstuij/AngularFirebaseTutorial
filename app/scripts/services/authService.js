'use strict';

app.factory('AuthService', function ($rootScope, $firebaseAuth, $firebase, FIREBASE_URL, cfpLoadingBar, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var firebaseAuthService = $firebaseAuth(ref);

  var auth = {
    register: function (user) {
      cfpLoadingBar.start();
      return firebaseAuthService.$createUser(user.email, user.password).then(function() {
        cfpLoadingBar.complete();
      });
    },
    login: function(user){
      //return AlertService.addProgressbar(firebaseAuthService.$authWithPassword({
      //  email: user.email,
      //  password: user.password
      //}));
      cfpLoadingBar.start();
      return firebaseAuthService.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function() {
          cfpLoadingBar.complete();
        });
    },
    logout: function() {
      firebaseAuthService.$unauth();
    },
    createProfile: function (user, profile) {
      var profileRef = $firebase(ref.child('user_profiles'));
      if (user.uid){
        return profileRef.$set(user.uid, profile);
      } else {
        return profileRef.$set(user.$id, profile);
      }
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
