'use strict';

app.factory('AuthService', function ($rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, cfpLoadingBar, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var onAuth = ref.onAuth.bind(ref);
  var firebaseAuthService = $firebaseAuth(ref);


  var auth = {
    register: function (user) {
      cfpLoadingBar.start();
      return AlertService.addProgressbar(firebaseAuthService.$createUser({
        email: user.email,
        password: user.password
      }),true);
    },
    login: function(user){
      return AlertService.addProgressbar(firebaseAuthService.$authWithPassword({
        email: user.email,
        password: user.password
      }), true);
    },
    logout: function() {
      firebaseAuthService.$unauth();
    },
    createProfile: function (user, profile) {
      var profileRef =  $firebaseArray(ref.child('user_profiles'));
      if (user.uid){
        return profileRef.$add(user.uid, profile);
      } else {
        return profileRef.$add(user.$id, profile);
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
    onAuth: onAuth,
    user: {}
  };

  onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, auth.user);
      auth.user.profile = $firebaseObject(ref.child('user_profiles').child(auth.user.uid));
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
