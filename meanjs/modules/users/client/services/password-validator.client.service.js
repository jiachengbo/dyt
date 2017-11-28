(function () {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    var service = {
      getResult: getResult,
      getPopoverMsg: getPopoverMsg
    };

    return service;

    function getResult(password) {
      var result = owaspPasswordStrengthTest.test(password);
      console.log(result);
      return result;
    }

    function getPopoverMsg() {
      var popoverMsg = '请输入密码 ' + owaspPasswordStrengthTest.configs.minLength + ' 或者更多的字符，数字，小写，大写，和特殊字符';

      return popoverMsg;
    }
  }

}());
