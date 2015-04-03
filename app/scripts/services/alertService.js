'use strict';

app.factory('AlertService', function ($rootScope, $timeout, $anchorScroll, cfpLoadingBar) {

  // create an array of alerts available globally
  $rootScope.alerts = [];

  var alertService = {
    //all: messages,
    addAlert: function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
      $anchorScroll('navbar');

      $timeout(function(){
        alertService.closeAlert($rootScope.alerts.indexOf(alert));
      }, 5000);
    },
    closeAlert: function(index) {
      $rootScope.alerts.splice(index);
    },
    addProgressbar: function(firebaseRequest, isAuth, message){
      cfpLoadingBar.start();
      // set timeout in case something takes longer than 10s and throw error message
      var timeout = setTimeout(function(){
        cfpLoadingBar.complete();
        if(message) {
          alertService.addAlert('warning','Failed to load ' + message + ' (check internet connectivity)');
        }
        console.log('Failed to load data from firebase (progressbar call)')
      }, 10000);

      // check if request concerns authentication (different callbacks)
      if (isAuth){
        firebaseRequest.then(function() {
          clearTimeout(timeout);
          cfpLoadingBar.complete();
        }, function (error) {
          clearTimeout(timeout);
          cfpLoadingBar.complete();
        });
        return firebaseRequest;
      } else {
        firebaseRequest.$loaded()
          .then(function() {
            clearTimeout(timeout);
            cfpLoadingBar.complete();
          }, function (error) {
            clearTimeout(timeout);
            cfpLoadingBar.complete();
          });
        return firebaseRequest;
      }
    }
  };

  return alertService;
});
