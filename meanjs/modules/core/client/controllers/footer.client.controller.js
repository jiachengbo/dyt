(function () {
  'use strict';

  angular
    .module('core')
    .controller('FooterController', FooterController);

  FooterController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$log'];

  function FooterController($scope, $state, Authentication, menuService, $log) {
    var vm = this;
    if (Authentication.user) {
      vm.show = true;
    } else {
      vm.show = false;
    }
  }
}());
