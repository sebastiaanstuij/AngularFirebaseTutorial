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
    'xeditable',
    'cfp.loadingBar',
    'toggle-switch',
    'cropme'
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
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'AuthController'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
      })
      .when('/calendar', {
        templateUrl: '/views/agenda.html',
        controller: 'AgendaController'
      })
      .when('/event', {
        templateUrl: '/views/eventCreate.html',
        controller: 'EventCreateController'
      })
      .when('/event/:eventId', {
        templateUrl: '/views/eventSignup.html',
        controller: 'EventSignupController'
      })
      .when('/admin/events', {
        templateUrl: '../views/admin-events-overview.html',
        controller: 'AdminEventsController'
      })
      .when('/admin/users', {
        templateUrl: '../views/admin-users-overview.html',
        controller: 'AdminUsersController'
      })
      .when('/admin/users/:userId', {
        templateUrl: '../views/admin-user-edit.html',
        controller: 'AdminUserController'
      })
      .when('/admin/settings', {
        templateUrl: 'views/admin-settings.html',
        controller: 'AdminSettingsController'
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
