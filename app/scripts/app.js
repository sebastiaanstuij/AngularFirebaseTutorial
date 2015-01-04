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
    'ui.bootstrap.datetimepicker',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostViewCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/calendar', {
        templateUrl: '/views/calendar.html',
        controller: 'CalendarCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.resolveUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://resplendent-heat-2047.firebaseio.com/');

