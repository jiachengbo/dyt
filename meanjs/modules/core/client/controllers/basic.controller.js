(function () {
  'use strict';

  angular
    .module('core')
    .controller('BasicController', BasicController);
  BasicController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'GetCommMemberService', 'GetTopVoiceService', 'jiedaodtService'];
  function BasicController($scope, $rootScope, $state, $window, GetStreetMemberService, GetCommMemberService, GetTopVoiceService, jiedaodtService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    GetStreetMemberService.query().$promise.then(function (data) {
      vm.streetMemberArr = data;
      // for (var i = 0; i < 8; i++) {
      //   vm.streetMemberArr.push(data[i]);
      // }
    });
    GetCommMemberService.query().$promise.then(function (data) {
      vm.commMemberArr = [];
      for (var i = 0; i < 6; i++) {
        vm.commMemberArr.push(data[i]);
      }
    });
    GetTopVoiceService.query({type: 1}).$promise.then(function (data) {
      vm.topVoiceData = data;
    });
    vm.toDetails = function ($event) {
      var id = angular.element($event.target).parent().children()[2].id;
      $state.go('topvoicexq', {id: id});
    };

    vm.pagenum = 1;
    jiedaodtService.query({count: true}).$promise.then(function (data) {
      vm.dataCount = data[0].count;
      vm.pageCount = Math.ceil(vm.dataCount / 8);
    });
    jiedaodtService.query().$promise.then(function (data) {
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
        jiedaodtService.query({page: num}).$promise.then(function (data) {
          vm.pagenum = num;
          vm.jiedao = data;
          angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
          $event.target.className = 'pageactive';
        });
      }
    };
  }
}());
