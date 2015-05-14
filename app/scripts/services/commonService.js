'use strict';

app.factory('CommonService', function ($firebaseObject, $firebaseArray, FIREBASE_URL, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var locations = AlertService.addProgressbar($firebaseArray(ref.child('common').child('locations')));

  var Common = {
    locations: {
      all: locations,
      create: function (location) {
        return locations.$add(location);
      },
      update: function (location) {
        return locations.$save(location);
      },
      get: function (locationId) {
        return $firebaseObject(locations.child(locationId));
      },
      delete: function (location) {
        return locations.$remove(location);
      }
    }//,
  };
  return Common;
});
