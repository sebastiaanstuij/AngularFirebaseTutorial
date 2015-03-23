'use strict';

app.factory('EventService', function ($firebase, FIREBASE_URL, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var events = AlertService.addProgressbar($firebase(ref.child('events')).$asArray(), false, 'events');
  var posts;
  var participants;


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
      },
    },
    posts: {
      all: function(eventId){
        posts =  AlertService.addProgressbar($firebase(ref.child('events').child(eventId).child('posts')).$asArray(), false, 'posts');
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
        participants = AlertService.addProgressbar($firebase(ref.child('events').child(eventId).child('participants')).$asArray(), false, 'participants');
        return participants
      },
      addParticipant: function (eventId, participant) {
        return $firebase(ref.child('events').child(eventId).child('participants')).$set(participant.uid, participant);
      },
      deleteParticipant: function (eventId, participant) {
        return $firebase(ref.child('events').child(eventId).child('participants')).$remove(participant);
      }
    }
  };

  return EventService;
});
