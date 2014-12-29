'use strict';

app.controller('AuthCtrl', function ($scope, $location, AuthService) {
  if (AuthService.signedIn()) {
    $location.path('/');
  }

  $scope.login = function () {
    AuthService.login($scope.user).then(function () {
      $location.path('/')
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {
    AuthService.register($scope.user).then(function(user) {
      return AuthService.login($scope.user).then(function() {
      user.username = $scope.user.username;
      return AuthService.createProfile(user);
      }).then(function() {
          $location.path('/');
        }, function (error) {
          $scope.error = error.toString();
        });
    });
  };

});
