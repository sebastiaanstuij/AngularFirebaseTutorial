'use strict';

app.controller('EventCreateController', function ($scope, $location, AlertService, EventService, CommonService) {
  // Get all location information
  $scope.locations = CommonService.locations.all;

  // Get all events
  $scope.allEvents = EventService.events.all;
  $scope.eventSources = [$scope.allEvents];

  //Declare a new event property which will be filled by the view
  $scope.event = {
    title:'',
    maxNumberParticipants: '',
    numberParticipants: '',
    registrationDate: '',
    start: '',
    end: '',
    id:''
  }

  // Call eventservice to add new event
  $scope.addEvent = function (isValid){
    // check if the form is valid before adding event
    if (isValid) {
      // add registrationdate and convert dates to strings for firebase
      $scope.event.registrationDate = moment().format('yyyy-mm-ddThh:mm:ss');
      $scope.event.start = moment($scope.startDate).format('yyyy-mm-ddThh:mm');
      $scope.event.end = moment($scope.endDate).format('yyyy-mm-ddThh:mm');
      $scope.event.id = $scope.allEvents.length+1;
      $scope.event.numberParticipants = 0;
      $scope.event.full = false;

      // call the events service and create the new event
      EventService.events.create($scope.event).then(
        function () {
          console.log('Successfully created event: ' + $scope.event.title);
          AlertService.addAlert('success', 'Successfully created event: ' + $scope.event.title);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error.message);
        }).then(function () {
          $location.path('/calendar');
        });
    }
  };

  // call events service to delete selected event
  $scope.deleteEvent = function(event){
    EventService.events.delete(event);
  };

  // call eventservice to modify selected event
  $scope.modifyEvent = function(event){
    $scope.event = EventService.events.get(event);
  };


});
