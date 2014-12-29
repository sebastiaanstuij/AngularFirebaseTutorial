'use strict';

app.controller('CalendarCtrl', function ($scope, EventService) {
  $scope.events = [EventService.all];

  $scope.newEvent = {
    title: '',
    date: ''
  };

  $scope.addEvent = function (){
    EventService.create($scope.newEvent);

    $scope.newEvent = {
      title: '',
      date: ''
    };
  };

  $scope.deleteEvent = function(event){
    EventService.delete(event);
  };


});
