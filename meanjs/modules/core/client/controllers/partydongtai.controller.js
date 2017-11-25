(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyDTController', PartyDTController);
  PartyDTController.$inject = ['$scope', 'Authentication', '$window', 'jiedaodtService', '$state', '$rootScope', 'partydtService'];
  function PartyDTController($scope, Authentication, $window, jiedaodtService, $state, $rootScope, partydtService) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
    vm.type = '农村党建';
    vm.dangjian = function (type) {
      vm.type = type;
      getcount(vm.type);
      getdata(vm.type, 0);
    };
    vm.num = 1;
    vm.shouye = function ($event) {
      getdata(vm.type, 0);
      vm.num = 1;
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.weiye = function ($event) {
      getdata(vm.type, (vm.yeshu - 1) * 8);
      vm.num = vm.yeshu;
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.shangye = function ($event) {
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
        getdata(vm.type, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.xiaye = function ($event) {
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
        getdata(vm.type, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.tiao = function ($event) {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        }
        getdata(vm.type, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    function getdata(type, num) {
      partydtService.query({type: type, limit: num}).$promise.then(function (data) {
        vm.dongtai = data;
      });
    }

    function getcount(type) {
      partydtService.query({count: 1, type: type}).$promise.then(function (data) {
        vm.count = data[0].num;
        vm.yeshu = Math.ceil(vm.count / 8);
      });
    }

    getcount(vm.type);
    getdata(vm.type, 0);
    // partydtService.query().$promise.then(function (data) {
    //   console.log(data);
    //   vm.dongtai = data;
    // });
  }
}());
