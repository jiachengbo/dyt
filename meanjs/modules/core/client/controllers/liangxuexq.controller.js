(function () {
  'use strict';

  angular
    .module('core')
    .controller('liangxuexqController', liangxuexqController);
  liangxuexqController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetKeyWorkService', '$stateParams', '$timeout'];
  function liangxuexqController($scope, $rootScope, $state, $window, GetKeyWorkService, $stateParams, $timeout) {
    var vm = this;
    vm.type = '两学一做';
    $rootScope.$emit('state', $state.current.url);
    var keyworkid = $stateParams.keyworkid;
    var typeid = $stateParams.typeId;
    console.log(typeid);
    if (typeid === 1) {
      vm.typeid = '上级部署';
    } else if (typeid === 2) {
      vm.typeid = '安排落实';
    } else if (typeid === 4) {
      vm.typeid = '书记讲党课';
    } else if (typeid === 5) {
      vm.typeid = '榜样的力量';
    } else if (typeid === 6) {
      vm.typeid = '长安新语';
    }

    function getKeyWorkData(keyid) {
      GetKeyWorkService.query({keyworkid: keyid}).$promise.then(function (data) {
        vm.keyWorkArr = data[0];
      });
    }
    getKeyWorkData(keyworkid);
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
