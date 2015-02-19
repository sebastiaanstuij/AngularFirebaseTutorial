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
    'firebase',
    'xeditable'
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
        controller: 'ProfileController'
      })
      .when('/calendar', {
        templateUrl: '/views/calendar.html',
        controller: 'CalendarController'
      })
      .when('/event', {
        templateUrl: '/views/event.html',
        controller: 'EventController'
      })
      .when('/event/:eventId', {
        templateUrl: '/views/signUpEvent.html',
        controller: 'SignUpController'
      })
      .when('/admin-users', {
        templateUrl: 'views/admin-users-overview.html',
        controller: 'AdminUserController'
      })
      .when('/admin-users/:userId', {
        templateUrl: 'views/admin-edit-user.html',
        controller: 'AdminUserController'
      })
      .when('/admin-settings', {
        templateUrl: 'views/admin-settings.html',
        controller: 'AdminSettingsController'
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

  .run(['$rootScope', '$location', 'AlertService', 'editableOptions', function($rootScope, $location, AlertService, editableOptions) {
    // set editable options theme
    editableOptions.theme = 'bs3';

    // navigate to home when something goes wrong
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
