'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, PostService) {
  $scope.post = PostService.get($routeParams.postId);
});
