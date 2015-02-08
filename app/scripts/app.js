'use strict';
/* global app:true */
/* exported app */
/**
 * @ngdoc overview
 * @name angularFirebaseTutorialApp
 * @description
 * # angularFirebaseTutorialApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angularFirebaseTutorialApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.calendar',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'firebase'
  ])

  .constant('FIREBASE_URL', 'https://resplendent-heat-2047.firebaseio.com/')

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'HomeController'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostDetailController'
      })
      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return AuthService.requireAuth();
          }]
        }
      })
      .when('/calendar', {
        templateUrl: '/views/calendar.html',
        controller: 'CalendarController',
        resolve: {
          "currentAuth": ["AuthService", function(AuthService) {
            return AuthService.requireAuth();
          }]
        }
      })
      .when('/admin', {
        templateUrl: 'views/admin-overview.html',
        controller: 'AdminController'
      })
      .when('/admin/:userId', {
        templateUrl: 'views/admin-edit.html',
        controller: 'AdminController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })

  .run(['$rootScope', '$location', 'AlertService', function($rootScope, $location, AlertService) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === 'AUTH_REQUIRED') {
        $location.path('/home');
      }
      console.log(error);
      AlertService.addAlert('danger', 'You need to login before you can go to this page');
    });
  }]);
