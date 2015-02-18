'use strict';

app.controller('AdminSettingsController', function ($scope, AlertService, CommonService) {
  // reference to Firebase locations
  $scope.locations = CommonService.locations.all;

  // add location row
  $scope.addLocationRow = function() {
    $scope.inserted = {
      id: $scope.locations.length+1,
      name: '',
      cost: '',
      info: '',
      proSpot:''
    };
    $scope.locations.push($scope.inserted);
  };

  // remove location
  $scope.saveLocation = function(data, id) {
    CommonService.locations.create(data);
  };

  // remove location
  $scope.removeLocation = function(index) {
    //TODO delete location
    var deleteLocation = $scope.locations[index];
    CommonService.locations.delete(deleteLocation);
    //$scope.locations.splice(index, 1);
  };


});
