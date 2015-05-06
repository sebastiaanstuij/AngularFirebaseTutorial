'use strict';

app.controller('AuthController', function ($rootScope, $scope, $location, AuthService, AlertService) {

  //set default visible values
  $scope.user = {
    driversLicense: false,
    ownGear: false,
    ownCar: false,
    image: null
  };

  if (AuthService.signedIn()) {
    $location.path('/');
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
        registrationDate: moment().format('YYYY/MM/DD hh:mm:ss'),
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

  $scope.$on("cropme:done", function(e, result, canvasEl) {
    console.log('crop geslaagd');
    var reader = new window.FileReader();
    // reader is an async call so we use it's 'onloadend' method to get the full
    reader.readAsDataURL(result.croppedImage);
    reader.onloadend = function() {
      console.log(reader.result);
      $scope.user.image = reader.result;

      console.log($scope.user);
    };
  });



});


