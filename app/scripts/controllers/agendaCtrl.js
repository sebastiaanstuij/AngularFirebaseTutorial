'use strict';

app.controller('AgendaController', function ($scope, $location, EventService) {
  $scope.eventClick =  function(eventData) {
    $scope.$apply(function () {
      $location.path('/event/'+ eventData.$id);
    });
  };

  //config settings for calendar
  $scope.uiConfig = {
    calendar:{
      height: 350,
      editable: false,
      header:{
        left: 'title',
        right: 'basicWeek,month,prev,next'
      },
      eventClick: $scope.eventClick
    }
  };

  //get all events
  $scope.allEvents = EventService.events.all;
  $scope.eventSources = [$scope.allEvents];

  // call eventservice to modify selected event
  $scope.getEvent = function(event){
    $scope.event = EventService.events.get(event);
  };

  // go to event view and controller to add new event
  $scope.addNewEvent = function() {
    $location.path( '/event' );
  };


});
