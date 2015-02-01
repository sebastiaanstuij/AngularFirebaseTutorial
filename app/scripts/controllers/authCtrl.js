'use strict';

app.controller('AuthController', function ($rootScope, $scope, $location, AuthService, AlertService) {

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


  $scope.register = function () {
    AuthService.register($scope.user).then(function() {
      return AuthService.login($scope.user).then(function(user) {
        user.username = $scope.user.username;
        return AuthService.createProfile(user).then(function() {
            console.log('Successfully registered as: ' + $scope.user);
            AlertService.addAlert('success', 'Successfully registered as: ' + $scope.user.email);
          }
        );
      }).then(function() {
        $location.path('/home');
      });
    }, function(error) {
      AlertService.addAlert('danger', error.message);
    });
  };

});


