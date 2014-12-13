'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularFirebaseTutorialApp
 */
angular.module('angularFirebaseTutorialApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
