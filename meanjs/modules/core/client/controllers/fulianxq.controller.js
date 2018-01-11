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
      // $timeout(function () {
      //   var iframe = document.querySelector('.myiframe');
      //   var bHeight = iframe.contentWindow.document.body.scrollHeight;
      //   var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      //   var height = Math.max(bHeight, dHeight);
      //   iframe.height = height;
      //   iframe.contentWindow.document.body.style.margin = '0 auto';
      // }, 5000);
      var iframe = document.querySelector('.myiframe');
      var bHeight;
      var dHeight;
      var height;
      var imgs;
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function() {
          // var iframe = document.querySelector('.myiframe');
          bHeight = iframe.contentWindow.document.body.scrollHeight;
          dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          height = Math.max(bHeight, dHeight);
          iframe.height = height;
        });
      } else {
        iframe.onload = function() {
          // var iframe = document.querySelector('.myiframe');
          bHeight = iframe.contentWindow.document.body.scrollHeight;
          dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          height = Math.max(bHeight, dHeight);
          iframe.height = height;
          imgs = iframe.contentWindow.document.getElementsByTagName('img');
          console.log(imgs)
        };
      }
    });

  }
}());
