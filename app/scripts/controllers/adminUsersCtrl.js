'use strict';

app.controller('AdminUsersController', function ($scope, $routeParams, $filter, $location,
                                                AlertService, AuthService, UserService) {
  // reference to Firebase user profiles
  $scope.users = UserService.all;

  //navigation variables
  $scope.search;
  $scope.currentPage = 1;
  $scope.maxSize = 6;
  $scope.itemsPerPage = 8;

  // wait for users to load
  $scope.users.$loaded().then(function(users) {
    $scope.totalItems = users.length;
  });

  $scope.$watch('search', function (newSearch) {
    $scope.currentPage = 1;
    $scope.filteredUsers = $filter('filter')($scope.users, $scope.search);
    $scope.totalItems = $scope.filteredUsers.length;
  });



  // check whether this controller has been called with a user id as routeParam
  // so that the selected user can be retrieved from firebase
  if($routeParams.userId) {
    $scope.selectedUser = UserService.get($routeParams.userId);
  }

  $scope.editUser = function (isValid) {
    if (isValid) {
      var profile = {
        firstName: $scope.selectedUser.firstName,
        lastName: $scope.selectedUser.lastName,
        username: $scope.selectedUser.username,
        email: $scope.selectedUser.email,
        phone: $scope.selectedUser.phone,
        level: $scope.selectedUser.level,
        driversLicense: $scope.selectedUser.driversLicense,
        ownGear: $scope.selectedUser.ownGear,
        ownCar: $scope.selectedUser.ownCar,
        busdriver: $scope.selectedUser.busdriver,
        isAdmin: $scope.selectedUser.isAdmin,
        verified: $scope.selectedUser.verified,
        saldo: $scope.selectedUser.saldo
      };

      AuthService.createProfile($scope.selectedUser, profile).then(
        function () {
          console.log('Successfully edited user: ' + $scope.selectedUser);
          AlertService.addAlert('success', 'Successfully updated: ' + $scope.selectedUser.username);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error.message);
      }).then(function () {
          $location.path('/admin-users');
        });
    }
  }

});
