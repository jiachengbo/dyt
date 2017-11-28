(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyxqController', PartyxqController);
  PartyxqController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function PartyxqController($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    vm.num = 1;
    vm.shouye = function () {
      getdata(0);
      vm.num = 1;
    };
    vm.weiye = function () {
      getdata((vm.yeshu - 1) * 4);
      vm.num = vm.yeshu;
    };
    vm.shangye = function () {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        } else {
          vm.num = vm.num - 1;
          if (vm.num < 1) {
            vm.num = 1;
          }
        }
        getdata((vm.num - 1) * 4);
      }
    };
    vm.xiaye = function () {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        } else {
          vm.num = vm.num + 1;
          if (vm.num > vm.yeshu) {
            vm.num = vm.yeshu;
          }
        }
        getdata((vm.num - 1) * 4);
      }
    };
    vm.tiao = function () {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        }
        getdata((vm.num - 1) * 4);
      }
    };
    $rootScope.$emit('state', $state.current.url);
    vm.paryxq = $window.localStorage.getItem('partyxq');
    function getdata(num) {
      partybuildService.query({id: vm.paryxq, limit: num}).$promise.then(function (data) {
        vm.project = data[0];
        vm.progress = data[1];
      });
    }
    function getcount() {
      partybuildService.query({count: 1, id: vm.paryxq}).$promise.then(function (data) {
        console.log(data);
        vm.count = data[0].num;
        vm.yeshu = Math.ceil(vm.count / 4);
      });
    }
    getcount();
    getdata(0);
  }
}());
