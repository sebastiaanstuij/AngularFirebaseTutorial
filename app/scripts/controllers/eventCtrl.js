'use strict';

app.controller('EventController', function ($scope, EventService) {
  //get all events
  $scope.allEvents = EventService.all;
  $scope.eventSources = [$scope.allEvents];

  //Declare a new event property which will be filled by the view
  $scope.event;

  // call eventservice to add new event
  $scope.addEvent = function (isValid){

    // check if the form is valid before adding event
    if (isValid) {
      // add registrationdate and convert dates to strings for firebase
      $scope.event.registrationDate = moment().format('DD-MM-YYYY, HH:mm:ss');
      //moment(moment($scope.event.start).unix()*1000)
      //Firebase.ServerValue.TIMESTAMP
      $scope.event.start = moment($scope.startDate).format('DD-MM-YYYY, HH:mm');
      $scope.event.end = moment($scope.endDate).format('DD-MM-YYYY, HH:mm');

      // call the eventservice and create the new event
      EventService.create($scope.event);
    }
  };

  // call eventservice to delete selected event
  $scope.deleteEvent = function(event){
    EventService.delete(event);
  };

  // call eventservice to modify selected event
  $scope.modifyEvent = function(event){
    $scope.event = EventService.get(event);
  };


});
