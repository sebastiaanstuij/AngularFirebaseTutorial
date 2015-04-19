'use strict';

app.controller('UserController', function ($scope, $routeParams, $location, UserService, AuthService) {
  $scope.user = UserService.get($routeParams.userId);

  $scope.signedIn = AuthService.signedIn;
  $scope.isAdmin = AuthService.isAdmin;

  $scope.isActive = function (viewLocation) {
    return viewLocation == $location.path();
  };

  $scope.doCollapse = function() {
    $scope.isCollapsed=true;
  };


});
