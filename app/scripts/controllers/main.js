'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseTutorialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFirebaseTutorialApp
 */
angular.module('angularFirebaseTutorialApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
