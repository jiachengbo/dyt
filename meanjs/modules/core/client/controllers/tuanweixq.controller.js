(function () {
  'use strict';

  angular
    .module('core')
    .controller('TuanWeiXqController', TuanWeiXqController);
  TuanWeiXqController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'GetTwMsgService', 'GetPartyBuildService', '$timeout'];
  function TuanWeiXqController($scope, $rootScope, $state, $stateParams, $window, GetTwMsgService, GetPartyBuildService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    var id = $stateParams.id;
    vm.type = $stateParams.type;
    GetTwMsgService.query({id: id}).$promise.then(function (data) {
      vm.detailsData = data[0];
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
