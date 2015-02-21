'use strict';

app.factory('CommonService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var locations = $firebase(ref.child('common').child('locations')).$asArray();

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
        return $firebase(locations.child(locationId)).$asObject();
      },
      delete: function (location) {
        return locations.$remove(location);
      }
    }//,
  };
  return Common;
});
