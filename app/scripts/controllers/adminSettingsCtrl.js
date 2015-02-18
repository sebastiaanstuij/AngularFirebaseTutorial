'use strict';

app.controller('AdminSettingsController', function ($scope, AlertService, CommonService) {
  // reference to Firebase locations
  $scope.locations = CommonService.locations.all;



});
