(function () {
  'use strict';

  angular
    .module('docconv')
    .controller('DocConvController', DocConvController);

  DocConvController.$inject = ['$scope', '$state'];

  function DocConvController($scope, $state) {
    var vm = this;
    vm.inputDocFile = '';
    vm.docFileName = '';

    vm.conv = function () {
      if (vm.inputDocFile) {
        vm.docFileName = '/api/docconv/' + vm.inputDocFile;
      } else {
        vm.docFileName = '';
      }
    };
  }
}());
