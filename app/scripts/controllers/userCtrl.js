'use strict';

app.controller('UserController', function ($scope, $routeParams, $location, UserService) {
  $scope.user = UserService.get($routeParams.userId);


});
