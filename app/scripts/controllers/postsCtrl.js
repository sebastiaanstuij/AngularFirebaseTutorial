'use strict';

app.controller('PostsCtrl', function ($scope, $location, PostService, AuthService) {
  $scope.posts = PostService.all;
  $scope.user = AuthService.user;
  $scope.signedIn = AuthService.signedIn;

  $scope.post = {
    title: '',
    url: 'http://'
  };

  $scope.addPost = function (){
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    PostService.createPost($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.key());
    });
  };

  $scope.deletePost = function(post){
    PostService.deletePost(post);
  };

});
