(function () {
  'use strict';

  angular
    .module('core')
    .controller('partyylxqController', partyylxqController);
  partyylxqController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetKeyWorkService', '$stateParams', '$timeout'];
  function partyylxqController($scope, $rootScope, $state, $window, GetKeyWorkService, $stateParams, $timeout) {
    var vm = this;
    vm.data = $stateParams.data;
    $timeout(function () {
      if (vm.data.file_path) {
        var iframe = document.querySelector('.myiframe');
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
        iframe.contentWindow.document.body.style.margin = '0 auto';
      }
    }, 500);
  }
}());
