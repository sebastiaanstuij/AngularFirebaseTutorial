'use strict';

app.controller('PostDetailCtrl', function ($scope, $routeParams, PostService, AuthService) {
  $scope.post = PostService.getPost($routeParams.postId);
  $scope.comments = PostService.getComments($routeParams.postId);
  $scope.user = AuthService.user;
  $scope.signedIn = AuthService.signedIn;

  $scope.addComment = function () {
    if(!$scope.commentText || $scope.commentText === '') {
      return;
    }

    var comment = {
      text: $scope.commentText,
      creator: $scope.user.profile.username,
      creatorUID: $scope.user.uid
    };

    PostService.createComment(comment);

    $scope.commentText = '';
  };

  $scope.deleteComment = function (comment) {
    //$scope.comments.$remove(comment);
    PostService.deleteComment(comment);
  };

});
