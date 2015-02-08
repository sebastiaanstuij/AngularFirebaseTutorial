'use strict';

app.controller('AdminController', function ($rootScope, $scope, $routeParams, $location, $firebase, FIREBASE_URL, AuthService, AlertService) {
  //navigation variables
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.numberOfPages = function(){
    return Math.ceil($scope.users.length/$scope.pageSize);
  };

  // reference to Firebase user profiles
  var ref = new Firebase(FIREBASE_URL);
  $scope.users = $firebase(ref.child('user_profiles')).$asArray();

  // check whether this controller has been called with a user id as routeParam
  // so that the selected user can be retrieved from firebase
  if($routeParams.userId) {
    $scope.selectedUser = $firebase(ref.child('user_profiles').child($routeParams.userId)).$asObject();
  }

  $scope.editUser = function (isValid) {
    if (isValid) {
      var profile = {
        firstName: $scope.selectedUser.firstName,
        lastName: $scope.selectedUser.lastName,
        username: $scope.selectedUser.username,
        email: $scope.selectedUser.email,
        phone: $scope.selectedUser.phone,
        level: $scope.selectedUser.level,
        driversLicense: $scope.selectedUser.driversLicense,
        ownGear: $scope.selectedUser.ownGear,
        ownCar: $scope.selectedUser.ownCar,
        busdriver: $scope.selectedUser.busdriver,
        isAdmin: $scope.selectedUser.isAdmin,
        saldo: $scope.selectedUser.saldo
      };

      AuthService.createProfile($scope.selectedUser, profile).then(
        function () {
          console.log('Successfully edited user: ' + $scope.selectedUser);
          AlertService.addAlert('success', 'Successfully updated: ' + $scope.selectedUser.username);
        },
        function (error) {
          AlertService.addAlert('danger', error.message);
      }).then(function () {
          $location.path('/admin');
        });
    }
  }

});
