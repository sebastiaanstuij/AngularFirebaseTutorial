'use strict';

app.controller('EventController', function ($scope, $location, AlertService, EventsService, CommonService) {
  // Get all location information
  $scope.locations = CommonService.locations.all;

  // Get all events
  $scope.allEvents = EventsService.all;
  $scope.eventSources = [$scope.allEvents];

  //Declare a new event property which will be filled by the view
  $scope.event;

  // Call eventservice to add new event
  $scope.addEvent = function (isValid){
    // check if the form is valid before adding event
    if (isValid) {
      // add registrationdate and convert dates to strings for firebase
      $scope.event.registrationDate = moment().format('YYYY/MM/DD hh:mm:ss');
      //moment(moment($scope.event.start).unix()*1000)
      //Firebase.ServerValue.TIMESTAMP
      $scope.event.start = moment($scope.startDate).format('YYYY/MM/DD hh:mm');
      $scope.event.end = moment($scope.endDate).format('YYYY/MM/DD hh:mm');

      // call the events service and create the new event
      EventsService.create($scope.event).then(
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
    EventsService.delete(event);
  };

  // call eventservice to modify selected event
  $scope.modifyEvent = function(event){
    $scope.event = EventsService.get(event);
  };


});
