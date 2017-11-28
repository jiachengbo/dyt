(function () {
  'use strict';

  angular
    .module('core')
    .controller('XianFenController', XianFenController);
  XianFenController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope', 'xianfeService', '$uibModal'];
  function XianFenController($scope, Authentication, $window, partybuildService, $state, $rootScope, xianfeService, $uibModal) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
    /* vm.inde = function (index) {
     alert(index);
     }*/


    vm.openjgModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/core/client/views/xjsj.html',
        controller: 'xjsjController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: resarg
      });
    };
    vm.xjsj = function (num) {
      var ZZJGmodal = vm.openjgModal({
        type: function () {
          return vm.contrnt[num];
        }
      });
    };
    vm.titlex = '基层党务工作者';
    angular.element(document.querySelectorAll('.xianjinshiji>li')).on('click', function ($even) {
      if ($even.target.innerHTML === '基层党务工作者') {
        getxianfen('基层党务工作者');
        vm.titlex = '基层党务工作者';
      } else if ($even.target.innerHTML === '巾帼妇女风采') {
        getxianfen('巾帼妇女风采');
        vm.titlex = '巾帼妇女';
      } else if ($even.target.innerHTML === '劳模风采') {
        getxianfen('劳模风采');
        vm.titlex = '劳模风采';
      } else {
        getxianfen('身边榜样');
        vm.titlex = '身边榜样';
      }
    });
    function getxianfen(type) {
      xianfeService.query({type: type}).$promise.then(function (data) {
        vm.contrnt = JSON.stringify(data);
        vm.contrnt = JSON.parse(vm.contrnt);
        vm.xianfe = data;
        for (var i = 0; i < vm.xianfe.length; i++) {
          if (vm.xianfe[i].deeds.length >= 240) {
            vm.xianfe[i].deeds = vm.xianfe[i].deeds.substring(0, 240) + '  ....';
          }
        }
      });
    }

    getxianfen('基层党务工作者');
  }
}());
