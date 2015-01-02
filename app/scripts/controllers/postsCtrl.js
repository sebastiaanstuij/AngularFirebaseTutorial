'use strict';

app.controller('PostsCtrl', function ($scope, $location, PostService) {
  $scope.posts = PostService.all;

  $scope.post = {
    title: '',
    url: 'http://'
  };

  $scope.submitPost = function (){
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    PostService.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
    });
  };

  $scope.deletePost = function(post){
    PostService.delete(post);
  };

});
