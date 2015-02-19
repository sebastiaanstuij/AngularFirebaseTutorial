'use strict';

app.factory('EventsService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var events = $firebase(ref.child('events')).$asArray();

  var Event = {
    all: events,
    create: function (event) {
      return events.$add(event);
    },
    get: function (eventId) {
      return $firebase(ref.child('events').child(eventId)).$asObject();
    },
    delete: function (event) {
      return events.$remove(event);
    }
  };

  return Event;
});
