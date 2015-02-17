'use strict';
app.directive('dateFormat', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function (data) {
        //convert data from view format to model format
        //var output = moment(data).format('DD-MM-YYYY, HH:mm:ss');
        return data; //converted
      });

      ngModelController.$formatters.push(function (data) {
        //convert data from model format to view format
        return data; //converted
      });
    }
  }

});
