'use strict';

describe('Controller: PostOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFirebaseTutorialApp'));

  var MainCtrl, scope;
  var mockService={} // here set up a mock

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('PostOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should add a post to posts after calling addPost', function () {
    expect(scope.posts.length).toEqual(0);

    scope.post = {
      title: 'test',
      url: 'http://www.test.com'
    };

    scope.addPost();

    expect(scope.posts.length).toEqual(1);
  });

  it('should delete a post to posts after calling deletePost', function () {

  });

});
