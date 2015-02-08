'use strict';

app.filter('startFromFilter', function () {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  };
});
