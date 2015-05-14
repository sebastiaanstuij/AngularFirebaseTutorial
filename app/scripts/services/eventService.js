'use strict';

app.factory('EventService', function ($firebaseObject, $firebaseArray, FIREBASE_URL, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var events = AlertService.addProgressbar($firebaseArray(ref.child('events')), false, 'events');
  var posts;
  var participants;


  var EventService = {
    events: {
      all: events,
      create: function (event) {
        return events.$add(event);
      },
      get: function (eventId) {
        return $firebaseObject(ref.child('events').child(eventId));
      },
      delete: function (event) {
        return events.$remove(event);
      },
    },
    posts: {
      all: function(eventId){
        posts =  AlertService.addProgressbar($firebaseArray(ref.child('events').child(eventId).child('posts')), false, 'posts');
        return posts;
      },
      createPost: function (post) {
        return posts.$add(post);
      },
      deletePost: function (post) {
        return posts.$remove(post);
      }
    },
    participants: {
      all: function(eventId){
        participants = AlertService.addProgressbar($firebaseArray(ref.child('events').child(eventId).child('participants')), false, 'participants');
        return participants
      },
      addParticipant: function (eventId, participant) {
        return $firebaseArray(ref.child('events').child(eventId).child('participants')).$add(participant.uid, participant);
      },
      deleteParticipant: function (eventId, participant) {
        return $firebaseArray(ref.child('events').child(eventId).child('participants')).$remove(participant);
      }
    }
  };

  return EventService;
});
