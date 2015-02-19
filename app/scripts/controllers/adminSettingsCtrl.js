'use strict';

app.controller('AdminSettingsController', function ($scope, AlertService, CommonService) {
  // reference to Firebase locations
  $scope.locations = CommonService.locations.all;
  $scope.boolValues = [{value: true, name: 'True'}, {value: false, name: 'False'}];


  // add location row
  $scope.addLocationRow = function() {
    $scope.inserted = {
      name: '',
      cost: '',
      info: '',
      proSpot:''
    };
    CommonService.locations.create($scope.inserted);
  };

  // remove location
  $scope.saveLocation = function(location) {
    console.log(location);
    CommonService.locations.update(location);
  };

  // remove location
  $scope.removeLocation = function(location) {
    CommonService.locations.delete(location);
  };


});
