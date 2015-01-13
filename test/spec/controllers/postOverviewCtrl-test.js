'use strict';

describe('Controller: PostOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFirebaseTutorialApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('PostOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should add a post to posts after calling addPost', function () {


  });

  it('should delete a post to posts after calling deletePost', function () {

  });

});
