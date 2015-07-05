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
    username: $scope.user.profile.username,
    picture: $scope.user.profile.profilePicture
  };


  // check if user is not already subscribed to this event
  $scope.participants.$loaded().then(function(participants) {
      for(var i=0;i<participants.length;i++){
        if(participants[i].uid === $scope.user.uid){
          $scope.userSubscribed = true;
          //$scope.participant =  participants[i];
          $scope.participant =  EventService.participants.getParticipant($scope.selectedEvent.$id,$scope.user.uid);
          break;
        }
      }
  });


  $scope.signup = function(){
    // first check if event is not fully booked already or that the user has not already subscribed
    if (!$scope.userSubscribed && ($scope.selectedEvent.numberParticipants <  $scope.selectedEvent.maxNumberParticipants)) {

        EventService.participants.addParticipant($scope.selectedEvent.$id, $scope.participant).then(
          function () {
            // save changes made to selectedEvent (number of participants + 1)
            $scope.selectedEvent.numberParticipants = $scope.participants.length+1;
            $scope.selectedEvent.$save();

            console.log('Successfully signed-up for event: ' + $scope.selectedEvent.title);
            AlertService.addAlert('success', 'Successfully signed-up for event: ' + $scope.selectedEvent.title);
          },
          function (error) {
            console.log(error);
            AlertService.addAlert('danger', error.message);
          }).then(function () {
            $location.path('/calendar');
          });
    } else {
      AlertService.addAlert('danger', 'Something went wrong while signing you up for this event');
    }
  };


  $scope.editSubscription = function () {
    if ($scope.editParticipant === true) {
      // User wants to update subscription
      $scope.participant.$save().then(
        function () {
          $scope.editParticipant = false;

          console.log('Successfully updated subscription: ' + $scope.selectedEvent.title);
          AlertService.addAlert('success', 'Successfully updated subscription: ' + $scope.selectedEvent.title);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error);
        });
    } else {
      AlertService.addAlert('danger', 'Something went wrong while editing your subscription for this event');
    }
  };

  //$scope.editSubscription = function (){
  //  $scope.editParticipant = true;
  //};


  $scope.removeSubscription = function (){
    $scope.participant.$remove().then(
      function () {
        $scope.userSubscribed = false;

        // save changes made to selectedEvent (number of participants - 1)
        $scope.selectedEvent.numberParticipants = $scope.participants.length-1;
        $scope.selectedEvent.$save();
      }
    );
    // reset default values
    $scope.participant = {
      kiteRent: false,
      busDriverVolunteer: false,
      shareKite: false,
      uid: $scope.user.uid,
      username: $scope.user.profile.username,
      picture: $scope.user.profile.profilePicture
    };
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
