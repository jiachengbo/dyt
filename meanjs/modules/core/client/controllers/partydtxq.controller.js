(function () {
  'use strict';
  angular
    .module('core')
    .controller('PartydtxqController', PartydtxqController);
  PartydtxqController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'partydtService', '$location', '$timeout'];
  function PartydtxqController($scope, $rootScope, $state, $window, $stateParams, partydtService, $location, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $window.localStorage.getItem('type');
    // vm.keyworkid = $window.localStorage.getItem('keyworkid');
    vm.partydtid = $location.search().id;
    function getKeyWorkData(id) {
      partydtService.query({id: id}).$promise.then(function (data) {
        console.log(data);
        vm.partydt = data[0];
      });
    }
    getKeyWorkData(vm.partydtid);
    $timeout(function () {
      var iframe = document.querySelector('.myiframe');
      var bHeight = iframe.contentWindow.document.body.scrollHeight;
      var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      var height = Math.max(bHeight, dHeight);
      iframe.height = height;
      iframe.contentWindow.document.body.style.margin = '0 auto';
    }, 500);
  }
}());
