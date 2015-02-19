'use strict';

app.controller('SignUpController', function ($scope, $routeParams, $location, AlertService, EventsService) {

  // load the selected event with firebase through the eventservice
  $scope.selectedEvent = EventsService.get($routeParams.eventId);
  console.log($scope.selectedEvent);







});
