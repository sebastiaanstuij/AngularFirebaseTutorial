'use strict';

app.controller('ProfileController', function ($scope, $routeParams, $location, CommonService, AuthService, AlertService) {
  $scope.user = CommonService.users.get($routeParams.userId);

  $scope.editUser = function (isValid) {
    if (isValid) {
      var profile = {
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        username: $scope.user.username,
        email: $scope.user.email,
        phone: $scope.user.phone,
        level: $scope.user.level,
        driversLicense: $scope.user.driversLicense,
        ownGear: $scope.user.ownGear,
        ownCar: $scope.user.ownCar,
        busdriver: $scope.user.busdriver,
        isAdmin: $scope.user.isAdmin,
        verified: $scope.user.verified,
        saldo: $scope.user.saldo
      };

      AuthService.createProfile($scope.user, profile).then(
        function () {
          console.log('Successfully edited user: ' + $scope.user);
          AlertService.addAlert('success', 'Successfully updated: ' + $scope.user.username);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error.message);
        }).then(function () {
          $location.path('/home');
        });
    }
  }

});
