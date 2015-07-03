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
    //TODO: Hook for addProgressbar
    login: function(user){
      return firebaseAuthService.$authWithPassword({
        email: user.email,
        password: user.password
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
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
      // this method is called before angular bindings kick in (ng-cloak),
      // so the user is resolved in all controllers/services that need it before the page continues loading
      // this will also fire the onAuth method and copy profile information to the logged in user
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
