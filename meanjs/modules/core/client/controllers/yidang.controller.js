(function () {
  'use strict';

  angular
    .module('core')
    .controller('yidangController', yidangController);
  yidangController.$inject = ['$scope', '$rootScope', '$state', '$window', 'PartyylService', '$interval'];
  function yidangController($scope, $rootScope, $state, $window, PartyylService, $interval) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    function getKeyWorkData(array, typeid) {
      PartyylService.query({
        isqiantai: true,
        typeId: typeid
      }).$promise.then(function (data) {
        angular.forEach(data, function (v, k) {
          array.push(v);
        });
      });
    }
    vm.jzfp = [];
    vm.qszq = [];
    vm.shjz = [];
    vm.wggl = [];
    vm.whsh = [];
    vm.pajs = [];
    getKeyWorkData(vm.jzfp, '精准扶贫');
    getKeyWorkData(vm.qszq, '亲商助企');
    getKeyWorkData(vm.shjz, '社会救助');
    getKeyWorkData(vm.wggl, '网格化管理');
    getKeyWorkData(vm.whsh, '文化生活');
    getKeyWorkData(vm.pajs, '平安建设');
    vm.toxqyl = function (e, data) {
      e.preventDefault();
      $state.go('partyylxq', {data: data});
      console.log(data);
    };
  }
}());
