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
        var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
        return posts;
      },
      createPost: function (eventId, post) {
        var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
        return posts.$add(post);
      },
      deletePost: function (eventId, post) {
        // possible bug in AngularFire?
        // var posts = $firebase(ref.child('events').child(eventId).child('posts')).$asArray();
        // return posts.$remove(post);
      }
    },
    participants: {
      all: function(eventId){
        var participants = $firebase(ref.child('events').child(eventId).child('participants')).$asArray();
        return participants;
      },
      addParticipant: function (eventId, participant) {
        //console.log(participant);
        var participants = $firebase(ref.child('events').child(eventId).child('participants')).$asArray();
        return participants.$add(participant);
      },
      deleteParticipant: function (eventId, participant) {
        // possible bug in AngularFire?
        // var participants = $firebase(ref.child('events').child(eventId).child('participants')).$asArray();
        // return participants.$remove(participant);
      }
    }
  };

  return EventService;
});
