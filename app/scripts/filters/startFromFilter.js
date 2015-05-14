'use strict';

// this filter is used to correctly filter elements in an array depending on page currently being viewed
app.filter('startFrom', function () {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  };
});
