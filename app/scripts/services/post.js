'use strict';

app.factory('Post', function ($resource) {
  return $resource('https://resplendent-heat-2047.firebaseIO.com/posts/:id.json');
});
