(function () {
  'use strict';

  angular
    .module('core')
    .controller('tongzhiController', tongzhiController);
  tongzhiController.$inject = ['$scope', 'Authentication', '$window', 'GetTopVoiceService', '$state', '$rootScope', 'partydtService'];
  function tongzhiController($scope, Authentication, $window, GetTopVoiceService, $state, $rootScope, partydtService) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
    vm.pagenum = 1;
    GetTopVoiceService.query({count: true, type: 2}).$promise.then(function (data) {
      vm.dataCount = data[0];
      vm.pageCount = Math.ceil(vm.dataCount / 8);
    });
    GetTopVoiceService.query({page: 1, type: 2}).$promise.then(function (data) {
      console.log(data);
      vm.jiedao = data;
    });
    vm.toPage = function (num, $event) {
      if (isNaN(num)) {
        $window.alert('请输入数字');
        vm.pagenum = 1;
      } else {
        if (num > vm.pageCount) {
          num = vm.pageCount;
        }
        if (num < 1) {
          num = 1;
        }
        GetTopVoiceService.query({page: num, type: 2}).$promise.then(function (data) {
          vm.pagenum = num;
          console.log(data);
          vm.jiedao = data;
          angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
          $event.target.className = 'pageactive';
        });
      }
    };

    // getcount(vm.type);
    // getdata(vm.type, 0);
    // partydtService.query().$promise.then(function (data) {
    //   console.log(data);
    //   vm.dongtai = data;
    // });
  }
}());
