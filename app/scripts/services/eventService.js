'use strict';

app.factory('EventService', function ($firebaseObject, $firebaseArray, FIREBASE_URL, AlertService, $q) {
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
      updateEvent: function (eventId) {
        return $firebaseObject(ref.child('events').child(eventId)).$save();
      },
      get: function (eventId) {
        return $firebaseObject(ref.child('events').child(eventId));
      },
      delete: function (event) {
        return events.$remove(event);
      }
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
        //return ref.child('events').child(eventId).child('participants').child(participant.uid).set(participant);

        // firebase set/promise construction because angularFire.$set method has changed
        var deferred = $q.defer();
        var eventRef =  ref.child('events').child(eventId).child('participants/' + participant.uid);

        eventRef.set(participant, function(error){
          if(!error) {
            deferred.resolve(ref);
          } else {
            deferred.reject(error);
          }
        });
        return deferred.promise;
      },
      getParticipant: function (eventId, participantId) {
        return $firebaseObject(ref.child('events').child(eventId).child('participants/'+ participantId));
      }
      //updateParticipant: function (eventId, participant) {
      //  //return ref.child('events').child(eventId).child('participants').child(participant.uid).set(participant);
      //
      //  // firebase set/promise construction because angularFire.$set method has changed
      //  var deferred = $q.defer();
      //  var eventRef =  ref.child('events').child(eventId).child('participants/'+  participant.uid);
      //
      //  eventRef.set(participant, function(error){
      //    if(!error) {
      //      deferred.resolve(ref);
      //    } else {
      //      deferred.reject(error);
      //    }
      //  });
      //  return deferred.promise;
      //},
      //deleteParticipant: function (eventId, participant) {
      //  return $firebaseArray(ref.child('events').child(eventId).child('participants')).$remove(participant);
      //}
    }
  };

  return EventService;
});
