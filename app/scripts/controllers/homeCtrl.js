'use strict';

app.controller('HomeController', function ($scope, $location, PostService, AuthService) {
  $scope.user =  AuthService.user;
  $scope.signedIn = AuthService.signedIn;
  $scope.posts = PostService.all;

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
