(function () {
  'use strict';
  angular
    .module('core')
    .controller('tongzhiXQController', tongzhiXQController);
  tongzhiXQController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'GetTopVoiceService', '$location', '$timeout'];
  function tongzhiXQController($scope, $rootScope, $state, $window, $stateParams, GetTopVoiceService, $location, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $window.localStorage.getItem('type');
    // vm.keyworkid = $window.localStorage.getItem('keyworkid');
    // vm.partydtid = $location.search().id;
    // function getKeyWorkData(id) {
    // }
    // getKeyWorkData(vm.partydtid);
    vm.id = $location.search().id;
    GetTopVoiceService.query({id: vm.id}).$promise.then(function (data) {
      vm.jiedaodt = data[0];
    });

    $timeout(function () {
      var iframe = document.querySelector('.myiframe');
      var bHeight = iframe.contentWindow.document.body.scrollHeight;
      var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      var height = Math.max(bHeight, dHeight);
      iframe.height = height;
      iframe.contentWindow.document.body.style.margin = '0 auto';
    }, 1000);

  }
}());
