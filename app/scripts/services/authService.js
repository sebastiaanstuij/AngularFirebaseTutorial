'use strict';

app.factory('AuthService', function ($firebaseAuth, $firebase, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    login: function(user){
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      })
    },
    logout: function() {
      auth.$unauth()
    },
    resolveUser: function() {
      return auth.$getAuth();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    createProfile: function (user) {
      console.log(user);
      var profile = {
        username: user.username,
        md5_hash: user.md5_hash
      };
      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
    },
    user: {}
  };

  auth.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, Auth.user);
      console.log("Logged in as:", authData.uid);
      if (isNewUser){
        ref.child("users").child(authData.uid).set(authData);
        //Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
      }
    } else {
      angular.copy({}, Auth.user);
      console.log("Logged out");
    }
  });

  //$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
  //  if (error === 'AUTH_REQUIRED') {
  //    $location.path('/');
  //  }
  //});

  return Auth;
});
