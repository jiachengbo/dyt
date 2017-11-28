(function () {
  'use strict';

  angular
    .module('core')
    .controller('XiaQuController', XiaQuController);
  XiaQuController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'GetCommMemberService', 'GetPartyBuildService', 'partydtService', 'communityService'];
  function XiaQuController($scope, $rootScope, $state, $window, GetStreetMemberService, GetCommMemberService, GetPartyBuildService, partydtService, communityService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.toXQ = function ($event, id) {
      var text = $event.target.innerText;
      $state.go('xiaquxq', {unit: text, id: id});
    };
    vm.commFlag = true;
    vm.type = '社区信息';
    vm.showComm = function ($event) {
      vm.commFlag = true;
      vm.cunFlag = false;
      vm.partyFlag = false;
      vm.type = '社区信息';
      if (angular.element(document.querySelectorAll('.active')).length) {
        angular.element(document.querySelectorAll('.active')).removeClass('active');
      }
      angular.element($event.target).parent().parent().addClass('active');
    };
    vm.showCun = function ($event) {
      vm.cunFlag = true;
      vm.commFlag = false;
      vm.partyFlag = false;
      vm.type = '村信息';
      if (angular.element(document.querySelectorAll('.active')).length) {
        angular.element(document.querySelectorAll('.active')).removeClass('active');
      }
      angular.element($event.target).parent().parent().addClass('active');
    };
    vm.showParty = function ($event) {
      vm.cunFlag = false;
      vm.commFlag = false;
      vm.partyFlag = true;
      vm.type = '党建动态';
      if (angular.element(document.querySelectorAll('.active')).length) {
        angular.element(document.querySelectorAll('.active')).removeClass('active');
      }
      angular.element($event.target).parent().parent().addClass('active');
    };
    vm.types = '全部';
    // vm.dangjian = function (type) {
    //   vm.types = type;
    //   getcount(vm.types);
    //   getdata(vm.types, 0);
    // };
    vm.num = 1;
    vm.shouye = function ($event) {
      getdata(vm.types, 0);
      vm.num = 1;
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.weiye = function ($event) {
      getdata(vm.types, (vm.yeshu - 1) * 8);
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
        getdata(vm.types, (vm.num - 1) * 8);
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
        getdata(vm.types, (vm.num - 1) * 8);
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
        getdata(vm.types, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    function getdata(types, num) {
      partydtService.query({type: types, limit: num}).$promise.then(function (data) {
        vm.dongtai = data;
      });
    }

    function getcount(types) {
      partydtService.query({count: 1, type: types}).$promise.then(function (data) {
        vm.count = data[0].num;
        vm.yeshu = Math.ceil(vm.count / 8);
      });
    }

    getcount(vm.types);
    getdata(vm.types, 0);
    communityService.query().$promise.then(function (data) {
      vm.cun = [];
      vm.comm = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].name.indexOf('社区') > 0) {
          vm.comm.push(data[i]);
        } else {
          if (data[i].name === '大雁塔街道') {
            break;
          }
          vm.cun.push(data[i]);
        }
      }

    });
  }
}());
