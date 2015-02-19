'use strict';

app.controller('SignUpController', function ($scope, $routeParams, $location, AlertService, EventsService,
                                             PostService, AuthService)
{
  // load the selected event with firebase through the eventservice
  $scope.selectedEvent = EventsService.get($routeParams.eventId);

  // get user settings
  $scope.user =  AuthService.user;
  $scope.signedIn = AuthService.signedIn;




  // Message functionality
  $scope.posts = PostService.all;

  $scope.post = {
    message: ''
  };

  $scope.addPost = function (){
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    PostService.createPost($scope.post);
  };

  $scope.deletePost = function(post){
    PostService.deletePost(post);
  };


});
