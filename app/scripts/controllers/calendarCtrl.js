'use strict';

app.controller('CalendarController', function ($scope, $location, EventService) {
  //config settings for calendar
  $scope.uiConfig = {
    calendar:{
      height: 350,
      editable: false,
      header:{
        left: 'title',
        right: 'basicWeek,month,prev,next'
      },
      eventClick: function(eventData){
        $scope.$apply(function(){
          $scope.gotoEvent(eventData)
        });
      }
    }
  };

  $scope.gotoEvent = function(eventData){
    $location.path('/event/'+ eventData.$id);
  };

  //get all events
  $scope.allEvents = (EventService.events.all());
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
