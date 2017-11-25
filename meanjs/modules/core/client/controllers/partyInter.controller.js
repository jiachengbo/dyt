(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyInterController', PartyInterController);
  PartyInterController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope', '$timeout'];
  function PartyInterController($scope, Authentication, $window, partybuildService, $state, $rootScope, $timeout) {
    var vm = this;
    $scope.rudang = {};
    $scope.rudang.memberSex = '1';

    $scope.save = function () {
      $window.alert('保存成功！');
      console.log($scope.rudang);
    };
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
    $scope.format = 'yyyy/MM/dd';
    $scope.altInputFormats = ['yyyy/M!/d!'];
    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };
    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };
    var i = 1;
    vm.src = '/modules/core/client/img/image/rudangshengqing/01.png';
    $timeout(function () {
      vm.tupain = function (a) {
        i++;
        if (i === 6) {
          i = 1;
        }
        if (a) {
          i = a;
        }
        angular.element(document.querySelector('.basic_menu_site>ul>li.basic_current')).removeClass('basic_current');
        angular.element(document.querySelectorAll('.basic_menu_site>ul>li:nth-of-type(' + i + ')')).addClass('basic_current');
        vm.src = '/modules/core/client/img/image/rudangshengqing/0' + i + '.png';
      };
    }, 500);
    // vm.tupain = function (a) {
    //   i++;
    //   if (i === 6) {
    //     i = 1;
    //   }
    //   if (a) {
    //     i = a;
    //   }
    //   angular.element(document.querySelector('.basic_menu_site>ul>li.basic_current')).removeClass('basic_current');
    //   angular.element(document.querySelectorAll('.basic_menu_site>ul>li:nth-of-type(' + i + ')')).addClass('basic_current');
    //   vm.src = '/modules/core/client/img/image/rudangshengqing/0' + i + '.png';
    //   $scope.$apply();
    // };
  }
}());
