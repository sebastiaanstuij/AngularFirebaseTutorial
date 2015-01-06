'use strict';

app.factory('AuthService', function ($firebaseAuth, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var isNewUser = false;

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password).then(isNewUser = true);
    },
    login: function(user){
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },
    logout: function() {
      auth.$unauth();
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
        username: user.username
        //birthdate: user.birthdate
      };

      return $firebase(ref.child('profile')).$set(user.uid, profile);
    },
    user: {}
  };

  auth.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, Auth.user);
      //Auth.user = $firebase(ref.child('users').child(authData.uid)).$asObject();
      Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
      //console.log('firebase ref', Auth.user);
      console.log('Logged in as:', authData.uid);
      //console.log('Logged in as:', Auth.user);

      if (isNewUser){
        $firebase(ref.child('users').child(authData.uid)).$set(authData);
        isNewUser = false;
      }

    } else {
      angular.copy({}, Auth.user);
      console.log('Logged out');
      console.log(Auth.user);
    }
  });

  //$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
  //  if (error === 'AUTH_REQUIRED') {
  //    $location.path('/');
  //  }
  //});

  return Auth;
});
