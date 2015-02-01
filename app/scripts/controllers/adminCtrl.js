'use strict';

app.controller('AdminController', function ($rootScope, $scope, $location, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  $scope.users = $firebase(ref.child('user_profiles')).$asArray();


});
