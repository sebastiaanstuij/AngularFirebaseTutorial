'use strict';

app.controller('AdminController', function ($rootScope, $scope, $routeParams, $location, $firebase, FIREBASE_URL, AuthService, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  $scope.users = $firebase(ref.child('user_profiles')).$asArray();

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
      });
    }
  }

});
