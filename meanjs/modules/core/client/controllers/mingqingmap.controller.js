(function () {
  'use strict';

  angular
    .module('core')
    .controller('mingqingMapController', mingqingMapController);
  mingqingMapController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'GetCommMemberService', 'GetPartyBuildService'];
  function mingqingMapController($scope, $rootScope, $state, $window, GetStreetMemberService, GetCommMemberService, GetPartyBuildService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.toXQ = function ($event) {
      var text = $event.target.innerText;
      $state.go('mingqmapxq', {unit: text});
    };
    vm.commFlag = true;
    vm.type = '社区民情';
    vm.showComm = function ($event) {
      vm.commFlag = true;
      vm.cunFlag = false;
      vm.type = '社区民情';
      if (angular.element(document.querySelectorAll('.active')).length) {
        angular.element(document.querySelectorAll('.active')).removeClass('active');
      }
      angular.element($event.target).parent().parent().addClass('active');
    };
    vm.showCun = function ($event) {
      vm.cunFlag = true;
      vm.commFlag = false;
      vm.type = '村民情';
      if (angular.element(document.querySelectorAll('.active')).length) {
        angular.element(document.querySelectorAll('.active')).removeClass('active');
      }
      angular.element($event.target).parent().parent().addClass('active');
    };
  }
}());
