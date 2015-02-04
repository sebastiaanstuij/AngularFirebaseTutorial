'use strict';

app.controller('AuthController', function ($rootScope, $scope, $location, AuthService, AlertService) {

  $scope.user = {
    driversLicense: false,
    ownGear: false,
    ownCar: false
  };

  if (AuthService.signedIn()) {
    $location.path('/');
  }

  $scope.login = function () {
    AuthService.login($scope.user).then(function () {
      $location.path('/');
      console.log('Successfully logged in as: ' + $scope.user);
      AlertService.addAlert('success', 'Successfully logged in as: ' + $scope.user.email);
    }, function (error) {
      console.log(error);
      AlertService.addAlert('danger', error.message);
    });
  };

  $scope.register = function (isValid) {
    if (isValid) {
      var profile = {
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        username: $scope.user.username,
        registrationDate: moment().format('DD-MM-YYYY, hh:mm:ss'),
        email: $scope.user.email,
        phone: $scope.user.phone,
        level: $scope.user.level,
        driversLicense: $scope.user.driversLicense,
        ownGear: $scope.user.ownGear,
        ownCar: $scope.user.ownCar,
        isAdmin: false
      };

      AuthService.register($scope.user).then(function () {
        return AuthService.login($scope.user).then(function (loggedInUser) {
          return AuthService.createProfile(loggedInUser, profile).then(function () {
              console.log('Successfully registered as: ' + $scope.user);
              AlertService.addAlert('success', 'Successfully registered as: ' + $scope.user.email);
            }
          );
        }).then(function () {
          $location.path('/home');
        });
      }, function (error) {
        AlertService.addAlert('danger', error.message);
      });
    }
  }

});


