'use strict';

app.factory('EventService', function ($firebase, FIREBASE_URL, AlertService) {
  var ref = new Firebase(FIREBASE_URL);
  var events;
  var posts;
  var participants

  var EventService = {
    events: {
      all: function(){
        events = AlertService.addProgressbar($firebase(ref.child('events')).$asArray());
        return events;
      },
      create: function (event) {
        return AlertService.addProgressbar(events.$add(event));
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
        posts =  AlertService.addProgressbar($firebase(ref.child('events').child(eventId).child('posts')).$asArray());
        return posts;
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
        participants = AlertService.addProgressbar($firebase(ref.child('events').child(eventId).child('participants')).$asArray());
        return participants
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
