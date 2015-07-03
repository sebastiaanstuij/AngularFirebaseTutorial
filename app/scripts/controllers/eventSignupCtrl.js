'use strict';

app.controller('EventSignupController', function ($scope, $routeParams, $location, AlertService,
                                                  EventService, AuthService) {
  // get user settings
  $scope.user =  AuthService.user;
  $scope.signedIn = AuthService.signedIn;
  $scope.editParticipant = false;
  $scope.userSubscribed = false;

  // load the selected event with firebase through the eventservice
  $scope.selectedEvent = EventService.events.get($routeParams.eventId);
  // get all participants
  $scope.participants = EventService.participants.all($scope.selectedEvent.$id);
  // get all posts
  $scope.posts = EventService.posts.all($scope.selectedEvent.$id);

  // set default values for participant
  $scope.participant = {
    kiteRent: false,
    busDriverVolunteer: false,
    shareKite: false,
    uid: $scope.user.uid,
    username: $scope.user.profile.username
  };


  // check if user is not already subscribed to this event
  $scope.participants.$loaded().then(function(participants) {
      for(var i=0;i<participants.length;i++){
        if(participants[i].uid === $scope.user.uid){
          $scope.userSubscribed = true;
          break;
        }
      }
  });


  $scope.signup = function(){
    // first check if event is not fully booked already or that the user has not already subscribed
    if (!$scope.userSubscribed && ($scope.selectedEvent.numberParticipants <  $scope.selectedEvent.maxNumberParticipants)) {

        // save changes made to selectedEvent (number of participants + 1 etc.)
        $scope.selectedEvent.numberParticipants = $scope.participants.length+1;
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
    } else if ($scope.editParticipant === true) {
      EventService.participants.updateParticipant($scope.selectedEvent.$id, $scope.participant).then(
        function () {
          console.log('Successfully updated event: ' + $scope.selectedEvent.title);
          AlertService.addAlert('success', 'Successfully updated event: ' + $scope.selectedEvent.title);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error);
        }).then(function () {
          $location.path('/calendar');
        });

    } else {
      AlertService.addAlert('danger', 'Something went wrong while modifying this event');
    }
  };

  $scope.deleteParticipant = function() {
    EventService.participants.deleteParticipant($scope.participant);
  };


  $scope.editSubscription = function (){
    $scope.editParticipant = true;
  };









  // Message functionality
  $scope.post = {
    message: ''
  };

  $scope.addPost = function (){
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;
    EventService.posts.createPost($scope.post);
  };

  $scope.deletePost = function(post){
    EventService.posts.deletePost(post);
  };


});
