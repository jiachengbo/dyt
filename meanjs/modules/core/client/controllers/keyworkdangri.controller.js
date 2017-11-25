(function () {
  'use strict';

  angular
    .module('core')
    .controller('KeyWorkDangRiController', KeyWorkDangRiController);
  KeyWorkDangRiController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'GetKeyWorkService', '$window', 'GetPartyBuildService'];
  function KeyWorkDangRiController($scope, $rootScope, $state, $stateParams, GetKeyWorkService, $window, GetPartyBuildService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $stateParams.type;
    vm.type = $window.localStorage.getItem('type');
    if (vm.type === '固定党日') {
      angular.element(document.querySelector('#index1_nav')).css('backgroundImage', 'url("/modules/core/client/img/image/map1/dangri2.png")');
    } else if (vm.type === '三会一课') {
      angular.element(document.querySelector('#index1_nav')).css('backgroundImage', 'url("/modules/core/client/img/image/map1/sanhui.png")');
    }
    vm.show = (vm.type !== '两学一做');
    function getKeyWorkData(key, partytype) {
      GetKeyWorkService.query({key: key, type: partytype}).$promise.then(function (data) {
        vm.keyWorkArr = data;
        for (var i = 0; i < vm.keyWorkArr.length; i++) {
          if (vm.keyWorkArr[i].content.length >= 110) {
            vm.keyWorkArr[i].content = vm.keyWorkArr[i].content.substring(0, 110) + '...';
          }
        }
      });
    }

    getKeyWorkData(vm.type, '农村党建');
    vm.dangjian = function (type) {
      getKeyWorkData(vm.type, type);
    };
    vm.toDetails = function ($event) {
      var keyworkid = angular.element($event.target).children('span').text();
      // $window.localStorage.setItem('type', vm.type);
      $window.localStorage.setItem('keyworkid', keyworkid);
      // $state.go('keyworkxq',{type: vm.type, id:keyworkid});
      $state.go('keyworkxq');
    };
  }
}());
