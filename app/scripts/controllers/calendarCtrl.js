'use strict';

app.controller('CalendarController', function ($scope, EventService) {
  //settings for modal window (add new event)
  $scope.showModal = false;
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  };

  //config settings for calendar
  $scope.uiConfig = {
    calendar:{
      height: 350,
      editable: true,
      header:{
        left: 'title',
        right: 'basicWeek,month,prev,next'
      }
      //timeFormat: 'H(:mm)'
    }
  };

  //get all events
  $scope.allEvents = EventService.all;
  $scope.eventSources = [$scope.allEvents];

  //propperties for adding a new event
  $scope.event = {
    title: '',
    start: ''
  };

  // call eventservice to add new event
  $scope.addEvent = function (){
    EventService.create($scope.event);
  };

  // call eventservice to delete selected event
  $scope.deleteEvent = function(event){
    EventService.delete(event);
  };

  // call eventservice to modify selected event
  $scope.modifyEvent = function(event){
    $scope.event = EventService.get(event);
  };



  $scope.dateTimeNow = function() {
    $scope.date = new Date();
  };
  $scope.dateTimeNow();

  $scope.toggleMinDate = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.maxDate = new Date('2014-06-22');
  $scope.toggleMinDate();

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };


  $scope.hourStep = 1;
  $scope.minuteStep = 15;

  $scope.timeOptions = {
    hourStep: [1, 2, 3],
    minuteStep: [1, 5, 10, 15, 25, 30]
  };

  $scope.showMeridian = true;
  $scope.timeToggleMode = function() {
    $scope.showMeridian = !$scope.showMeridian;
  };





});
