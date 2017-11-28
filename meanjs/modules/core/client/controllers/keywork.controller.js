(function () {
  'use strict';

  angular
    .module('core')
    .controller('KeyWorkController', KeyWorkController);
  KeyWorkController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetKeyWorkService', 'GetCommMemberService', 'GetPartyBuildService'];
  function KeyWorkController($scope, $rootScope, $state, $window, GetKeyWorkService, GetCommMemberService, GetPartyBuildService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    function getKeyWorkData(key) {
      GetKeyWorkService.query({key: key}).$promise.then(function (data) {
        vm.keyWorkArr = [];
        for (var i = 0; i < 4; i++) {
          vm.keyWorkArr.push(data[i]);
        }
      });
    }

    getKeyWorkData('两学一做');
    vm.changeKey = function ($event) {
      if ($event.target.innerText === '更多+') {
        var type = angular.element(document.querySelector('.keyword_active'))[0].innerText;
        $window.localStorage.setItem('type', type);
        $state.go('keyworkdangri');
      } else {
        getKeyWorkData($event.target.innerText);
        angular.element(document.querySelector('.keyword_active')).removeClass('keyword_active');
        angular.element($event.target).parent().addClass('keyword_active');
      }
    };
  }
}());
