'use strict';

app.controller('EventSignupController', function ($scope, $routeParams, $location, AlertService,
                                                  EventService, AuthService)
{

  // get user settings
  $scope.user =  AuthService.user;
  $scope.signedIn = AuthService.signedIn;

  // load the selected event with firebase through the eventservice
  $scope.selectedEvent = EventService.events.get($routeParams.eventId);
  // get all participants
  $scope.participants = EventService.participants.all($scope.selectedEvent.$id);
  // get all posts
  $scope.posts = EventService.posts.all($scope.selectedEvent.$id);
  console.log($scope.posts);

  // set default values
  $scope.participant = {
    kiteRent: false,
    busDriverVolunteer: false,
    shareKite: false
  };

  $scope.signup = function(){
    console.log($scope.selectedEvent);
    $scope.participant.userID = $scope.user.uid;
    $scope.participant.username = $scope.user.profile.username;
    $scope.selectedEvent.numberParticipants = $scope.participants.length+1;
    // save changes made to selectedEvent (number of participants + 1)
    $scope.selectedEvent.$save();

    EventService.participants.addParticipant($scope.selectedEvent.$id, $scope.participant).then(
      function () {
        console.log('Successfully signed-up for event: ' + $scope.selectedEvent.title);
        AlertService.addAlert('success', 'Successfully signed-up for event: ' + $scope.selectedEvent.title);
      },
      function (error) {
        console.log(error);
        AlertService.addAlert('danger', error.message);
      }).then(function () {
        $location.path('/calendar');
      });
  };



  // Message functionality
  $scope.post = {
    message: ''
  };

  $scope.addPost = function (){
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    EventService.posts.createPost($scope.selectedEvent.$id, $scope.post);
  };

  $scope.deletePost = function(post){
    EventService.posts.deletePost($scope.selectedEvent.$id, post);
  };


});
