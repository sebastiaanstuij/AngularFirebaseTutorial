'use strict';

app.controller('NavbarController', function ($scope, AuthService, $location) {

  $scope.signedIn = AuthService.signedIn;
  $scope.logout = AuthService.logout;

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  //$scope.doCollapse = function() {
  //  $scope.isCollapsed=true;
  //};

});
