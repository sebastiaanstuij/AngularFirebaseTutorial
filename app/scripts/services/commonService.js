'use strict';

app.factory('CommonService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var locations = $firebase(ref.child('common').child('locations')).$asArray();
  var users = $firebase(ref.child('user_profiles')).$asArray();

  var Common = {
    locations: {
      all: locations,
      create: function (location) {
        return locations.$add(location);
      },
      get: function (locationId) {
        return $firebase(locations.child(locationId)).$asObject();
      },
      delete: function (location) {
        return locations.$remove(location);
      }
    },
    users: {
      all: users,
      get: function (userId) {
        return $firebase(ref.child('user_profiles').child(userId)).$asObject();
      },
      delete: function (location) {
        return locations.$remove(location);
      }
    }
  };
  return Common;
});
