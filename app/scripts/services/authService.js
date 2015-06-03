'use strict';

app.factory('AuthService', function ($rootScope, $q, $location, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, cfpLoadingBar, AlertService) {
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
      // firebase set/promise construction because angularFire.$set method has changed
      var deferred = $q.defer();
      var profileRef =  ref.child('user_profiles/' + user.$id);
      profileRef.set(profile, function(error){
        if(!error) {
          deferred.resolve(ref);
        } else {
          deferred.reject('createProfile promise failed');
          console('createProfile failed');
        }
      });
      return deferred.promise;
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
      // copy authenticated user data to user object
      angular.copy(authData, auth.user);
      // get profile data and assign it to authenticated user object
      auth.user.profile = $firebaseObject(ref.child('user_profiles').child(auth.user.uid));
      console.log('($onAuth) Logged in as: ', auth.user.profile);
      // after user is logged in -> go to home page
      //$location.path('/');
    } else {
      // if no authData is received then the user is not logged in and all relevant data is removed
      if(auth.user && auth.user.profile) {
        auth.user.profile.$destroy();
      }
      angular.copy({}, auth.user);
      $location.path('/home');
      console.log('($onAuth) Logged out');
    }
  });

  return auth;
});
