'use strict';

app.controller('CalendarCtrl', function ($scope, EventService) {
  $scope.events = [EventService.all];

  $scope.newEvent = {
    title: '',
    start: ''
  };

  $scope.addEvent = function (){
    EventService.create($scope.newEvent);

    $scope.newEvent = {
      title: '',
      start: ''
    };
  };

  $scope.deleteEvent = function(event){
    EventService.delete(event);
  };


});
