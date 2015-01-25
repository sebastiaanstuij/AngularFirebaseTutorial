'use strict';

app.controller('AuthCtrl', function ($scope, $location, AuthService, AlertService) {
  $scope.user = AuthService.user;

  if (AuthService.signedIn()) {
    $location.path('/');
  }

  $scope.login = function () {
    AuthService.login($scope.user).then(function () {
      $location.path('/');
      AlertService.addAlert('success', 'Successfully logged in as: ');
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
            AlertService.addAlert('success', 'Successfully registered as: ');
          }
        );
      }).then(function() {
        $location.path('/');
      });
    }, function(error) {
      AlertService.addAlert('danger', error.message);
    });
  };

});


