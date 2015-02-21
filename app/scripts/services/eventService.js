'use strict';

app.factory('EventService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var events = $firebase(ref.child('events')).$asArray();

  var EventService = {
    events: {
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
    },
    posts: {
      all: function(eventId){
        return $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
      },
      createPost: function (eventId, post) {
        return $firebase(ref.child('events').child(eventId).child('posts')).$push(post);

        //var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
        //return posts.$add(post);
      },
      deletePost: function (eventId, post) {
        return $firebase(ref.child('events').child(eventId).child('posts')).$remove(post.$id);
      }
    },
    participants: {
      all: function(eventId){
        return $firebase(ref.child('events').child(eventId).child('participants')).$asArray();
      },
      addParticipant: function (eventId, participant) {
        return $firebase(ref.child('events').child(eventId).child('participants')).$push(participant);
      },
      deleteParticipant: function (eventId, participantId) {
        return $firebase(ref.child('events').child(eventId).child('participants')).$remove(participantId);
      }
    }
  };

  return EventService;
});
