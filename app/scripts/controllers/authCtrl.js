'use strict';

app.controller('AuthController', function ($rootScope, $routeParams, $scope, $location, UserService, AuthService, AlertService) {

  // check whether existing user is being modified
  if($routeParams.userId) {
    $scope.user = UserService.get($routeParams.userId);
  } else{
    // a new user is being added
    // set default visible values
    $scope.user = {
      driversLicense: false,
      ownGear: false,
      ownCar: false,
      image: null
    };
  }

  $scope.login = function () {
    AuthService.login($scope.user).then(function () {
      $location.path('/');
      //console.log('Successfully logged in as: ' + $scope.user.username);
      AlertService.addAlert('success', 'Successfully logged in as: ' + $scope.user.email);
    }, function (error) {
      console.log(error);
      AlertService.addAlert('danger', error.message);
    });
  };

  $scope.register = function (isValid) {
    if (isValid) {
      if ($scope.user.image === null) {
        $scope.user.image = "../images/default-avatar.gif"
      }
      var profile = {
        profilePicture: $scope.user.image,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        username: $scope.user.username,
        registrationDate: moment().format('yyyy-mm-ddThh:mm:ss'),
        email: $scope.user.email,
        phone: parseInt($scope.user.phone),
        level: $scope.user.level,
        driversLicense: $scope.user.driversLicense,
        ownGear: $scope.user.ownGear,
        ownCar: $scope.user.ownCar,
        busdriver: false,
        saldo: 0,
        isAdmin: false,
        verified: false
      };
      AuthService.register($scope.user).then(function () {
        return AuthService.login($scope.user).then(function (loggedInUser) {
          return AuthService.createProfile(loggedInUser, profile).then(function () {
              console.log('Successfully registered as: ' + $scope.user);
              AlertService.addAlert('success', 'Successfully registered as: ' + $scope.user.email);
            }
          );
        }).then(function () {
          $location.path('/home');
        });
      }, function (error) {
        console.log(error);
        AlertService.addAlert('danger', error.message);
      });
    }
  };

  $scope.editUser = function (isValid) {
    if (isValid) {
      var profile = {
        profilePicture: $scope.user.image,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        username: $scope.user.username,
        email: $scope.user.email,
        phone: parseInt($scope.user.phone),
        level: $scope.user.level,
        driversLicense: $scope.user.driversLicense,
        ownGear: $scope.user.ownGear,
        ownCar: $scope.user.ownCar,
        busdriver: $scope.user.busdriver,
        isAdmin: $scope.user.isAdmin,
        verified: $scope.user.verified,
        saldo: $scope.user.saldo
      };

      AuthService.createProfile($scope.user, profile).then(
        function () {
          console.log('Successfully edited user: ' + $scope.user);
          AlertService.addAlert('success', 'Successfully updated: ' + $scope.user.username);
        },
        function (error) {
          console.log(error);
          AlertService.addAlert('danger', error.message);
        }).then(function () {
          $location.path('/home');
        });
    }
  };


  $scope.$on("cropme:done", function(e, result, canvasEl) {
    var reader = new window.FileReader();
    // reader is an async call so we use it's 'onloadend' method to get the full
    reader.readAsDataURL(result.croppedImage);
    reader.onloadend = function() {
      $scope.user.image = reader.result;
    };
  });


});


