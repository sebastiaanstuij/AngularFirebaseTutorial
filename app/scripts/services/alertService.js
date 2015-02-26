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
    addProgressbar: function(firebaseRequest){
      cfpLoadingBar.start();
      //var events = $firebase(ref.child('events')).$asArray();
      firebaseRequest.$loaded()
        .then(function() {
          cfpLoadingBar.complete();
        });
      return firebaseRequest;
    }
  };

  return alertService;
});
