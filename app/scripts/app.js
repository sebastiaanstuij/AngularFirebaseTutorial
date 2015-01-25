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
        templateUrl: 'views/posts.html',
        controller: 'PostOverviewCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return AuthService.waitForAuth();
          }]
        }
      })
      .when('/posts/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostDetailCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          profile: function($route, ProfileService) {
            return ProfileService.get($route.current.params.userId);
          },
          posts: function($route, ProfileService) {
            return ProfileService.getPosts($route.current.params.userId);
          }
        }
      })
      .when('/calendar', {
        templateUrl: '/views/calendar.html',
        controller: 'CalendarCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return AuthService.requireAuth();
          }]
        }
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

  .run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/home");
      }
      console.log("Authentication required")
    });
  }]);
