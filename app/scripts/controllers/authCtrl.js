'use strict';

app.controller('AuthController', function ($rootScope, $routeParams, $scope, $location, UserService, AuthService, AlertService) {
  // profile picture variables
  $scope.image = null;
  $scope.croppedImage = null;
  $scope.showCroppedImage = false;


  // check whether existing user is being modified
  if($routeParams.userId) {
    $scope.user = UserService.get($routeParams.userId);
  } else{
    // a new user is being added
    // set default visible values
    $scope.user = {
      driversLicense: false,
      ownGear: false,
      ownCar: false
    };
  }

  $scope.login = function () {
    AuthService.login($scope.user).then(function () {
      $location.path('/');
      AlertService.addAlert('success', 'Successfully logged in as: ' + $scope.user.email);
    }, function (error) {
      console.log(error);
      AlertService.addAlert('danger', error.message);
    });
  };

  $scope.register = function (isValid) {
    if (isValid) {
      if ($scope.croppedImage === null) {
        $scope.croppedImage = "../images/default-avatar.gif"
      }
      var profile = {
        profilePicture: $scope.croppedImage,
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
        AlertService.addAlert('danger', error.message);
        console.log(error);
      });
    }
  };

  $scope.editUser = function (isValid) {
    console.log($scope.user.profilePicture);
    console.log($scope.croppedImage);

    if (isValid) {

      if ($scope.croppedImage) {
        $scope.user.profilePicture = $scope.croppedImage;
      }

      var profile = {
        profilePicture: $scope.user.profilePicture,
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
          console.log('Successfully edited user: ' + $scope.user.username);
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

  // function to handle the profile photo file after selection
  var handleFileSelect = function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.image = evt.target.result;
        $scope.showCroppedImage = true;
      });
    };
    reader.readAsDataURL(file);
  };

  //jQuery on change event for triggering handleFileSelect function after profile photo is selected from files
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
});


