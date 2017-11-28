(function () {
  'use strict';

  angular
    .module('core')
    .controller('FuLianXqController', FuLianXqController);
  FuLianXqController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'GetFlMsgService', 'GetPartyBuildService', '$timeout'];
  function FuLianXqController($scope, $rootScope, $state, $stateParams, $window, GetFlMsgService, GetPartyBuildService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    var id = $stateParams.id;
    GetFlMsgService.query({id: id, limit: 1}).$promise.then(function (data) {
      vm.detailsData = data[0];
      console.log(vm.detailsData);
    });
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
