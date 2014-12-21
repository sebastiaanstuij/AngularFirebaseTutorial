'use strict';

app.controller('PostsCtrl', function ($scope, $location, PostService) {
  $scope.posts = PostService.all;

  $scope.post = {
    title: '',
    url: 'http://'
  };

  $scope.submitPost = function (){
    PostService.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
    });
  };

  $scope.deletePost = function(post){
    PostService.delete(post);
  };

});
