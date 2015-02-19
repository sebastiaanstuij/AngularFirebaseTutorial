'use strict';

app.controller('CalendarController', function ($scope, $location, EventsService) {
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
      //timeFormat: 'H(:mm)'
    }
  };

  $scope.gotoEvent = function(eventData){
    $location.path('/event/'+ eventData.$id);
    console.log(eventData);
  };

  //get all events
  $scope.allEvents = EventsService.all;
  $scope.eventSources = [$scope.allEvents];

  // call eventservice to modify selected event
  $scope.modifyEvent = function(event){
    $scope.event = EventsService.get(event);
  };

  // go to event view and controller to add new event
  $scope.addNewEvent = function() {
    $location.path( '/event' );
  };


});
