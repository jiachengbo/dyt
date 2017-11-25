(function () {
  'use strict';

  angular
    .module('core')
    .controller('liangxueController', liangxueController);
  liangxueController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetKeyWorkService', '$interval'];
  function liangxueController($scope, $rootScope, $state, $window, GetKeyWorkService, $interval) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    $interval.cancel($rootScope.kouhao);
    function getKeyWorkData(array, key, id) {
      GetKeyWorkService.query({key: key, typeid: id}).$promise.then(function (data) {
        var len;
        // console.log(data);
        // if (id === 5) {
        //   if (len < 4) {
        //     len = data.lenght;
        //   } else {
        //     len = 4;
        //   }
        // } else {
        //   if (len < 6) {
        //     len = data.lenght;
        //   } else {
        //     len = 6;
        //   }
        // }
        if (len < 6) {
          len = data.lenght;
        } else {
          len = 6;
        }

        for (var i = 0; i < len; i++) {
          array.push(data[i]);
        }
      });
    }

    vm.shangji = [];
    vm.shangji1 = [];
    vm.shangji2 = [];
    vm.shangji3 = [];
    vm.shangji4 = [];
    vm.shangji5 = [];
    getKeyWorkData(vm.shangji, '两学一做', 1);
    getKeyWorkData(vm.shangji1, '两学一做', 2);
    getKeyWorkData(vm.shangji2, '两学一做', 3);
    getKeyWorkData(vm.shangji3, '两学一做', 4);
    getKeyWorkData(vm.shangji4, '两学一做', 5);
    getKeyWorkData(vm.shangji5, '两学一做', 6);
    vm.jcdt = function (id, type) {
      if (type === 3) {
        $state.go('jicengdt', {keyworkid: id, typeId: type});
      } else {
        $state.go('liangxuexq', {keyworkid: id, typeId: type});
      }
    };
  }
}());
