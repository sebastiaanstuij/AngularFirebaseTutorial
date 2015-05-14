'use strict';

app.controller('NavbarController', function ($rootScope, $scope, $location, AuthService, AlertService) {
  $scope.signedIn = AuthService.signedIn;
  $scope.isAdmin = AuthService.isAdmin;
  $scope.logout = AuthService.logout;
  $scope.user = AuthService.user;

  $scope.isAdminRoute = function () {
    return ~$location.path().indexOf("/admin/");
  };

  $scope.isActive = function (viewLocation) {
    return viewLocation == $location.path();
  };

  $scope.doCollapse = function() {
    $scope.isCollapsed=true;
  };

  $rootScope.closeAlert = AlertService.closeAlert;

});
