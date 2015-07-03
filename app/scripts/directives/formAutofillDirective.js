'use strict';
//app.directive("autofill", function () {
//  return {
//    require: "ngModel",
//    link: function (scope, element, attrs, ngModel) {
//      scope.$on("autofill:update", function() {
//        ngModel.$setViewValue(element.val());
//      });
//    }
//  };
//});

//TODO: directive voor password autocomplete (nog niet geïmplementeerd)
//http://timothy.userapp.io/post/63412334209/form-autocomplete-and-remember-password-with
app.directive("ngLoginSubmit", function(){
  return {
    restrict: "A",
    scope: {
      onSubmit: "=ngLoginSubmit"
    },
    link: function(scope, element, attrs) {
      $(element)[0].onsubmit = function() {
        $("#login-login").val($("#login", element).val());
        $("#login-password").val($("#password", element).val());

        scope.onSubmit(function() {
          $("#login-form").submit();
        });
        return false;
      };
    }
  };
});
