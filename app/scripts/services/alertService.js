'use strict';

app.factory('AlertService', function ($rootScope, $timeout, cfpLoadingBar) {

  // create an array of alerts available globally
  $rootScope.alerts = [];

  var alertService = {
    //all: messages,
    addAlert: function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});

      $timeout(function(){
        alertService.closeAlert($rootScope.alerts.indexOf(alert));
      }, 5000);
    },
    closeAlert: function(index) {
      $rootScope.alerts.splice(index);
    },
    addProgressbar: function(firebaseRequest, isAuth){
      cfpLoadingBar.start();
      // set timeout in case something takes longer than 10s and throw error message
      var timeout = setTimeout(function(){
        cfpLoadingBar.complete();
        alertService.addAlert('warning','failed to load data (check internet connectivity)');
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
      } else{
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
